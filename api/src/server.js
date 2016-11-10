/* eslint-disable no-console */
const koa = require('koa');
const KoaBody = require('koa-body');
const Router = require('koa-router');
const db = require('./config/db.js');
const env = require('./config/env');

const app = koa();
const router = new Router();
const koaBody = new KoaBody();
const PORT = env.PORT;

app.context.db = db;

router.get('/activities', koaBody,
  function* getActivities() {
    const activities = yield this.db.activities.findAll();
    this.body = { activities };
  }
);

router.get('/activities/:id', koaBody,
  function* getActivity() {
    const id = this.params.id;
    const activity = yield this.db.activities.find({
      where: { id },
    });
    this.body = { activity };
  }
);

router.post('/activities', koaBody,
  function* createActivity() {
    if (!this.request.body) {
      this.throw("The body is empty", 400);
    }
    if (!this.request.body.text) {
      this.throw("Missing activity text", 400);
    }
    if (!this.request.body.time) {
      this.throw("Missing activity date", 400);
    }

    const { text, time } = this.request.body;
    const activity = yield this.db.activities.create({
      text,
      time,
    });
    this.body = activity;
  }
);

router.patch('/activities/:id', koaBody,
  function* updateActivity() {
    const id = this.params.id;
    const body = this.request.body;
    const updates = {};

    if (body.text) {
      updates.text = body.text;
    }
    if (body.time) {
      updates.time = body.time;
    }

    const activity = yield this.db.activities.find({
      where: { id },
    });
    try {
      this.body = yield activity.updateAttributes(updates);
    } catch (err) {
      this.body = err;
    }
  }
);

router.delete('/activities/:id', koaBody,
  function* deleteActivity() {
    const id = this.params.id;
    const deleted = yield this.db.activities.destroy({
      where: { id },
    });
    this.body = deleted;
  }
);

router.get('/', koaBody,
  function* index(next) {
    yield next;
    console.log(this.request.body);

    // => POST body
    this.body = "look it's the body!";
  }
);


// x-response-time

app.use(function* xResponseTime(next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  this.set('X-Response-Time', `${ms} ms`);
});

// logger
app.use(function* logger(next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

app.use(function* catchAll(next) {
  this.body = 'hello from koa';
  yield next;
});

app.use(router.routes());

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Express listening on port:', PORT);
  });
});

/* eslint-enable no-console */
