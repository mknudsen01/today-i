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
