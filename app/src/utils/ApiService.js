import superagent from 'superagent';
import API from './Api';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  if (path.startsWith('http')) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  const url = API.url;
  return url + adjustedPath;
}

class ApiService {
  constructor() {
    methods.forEach((method) => {
      this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        request.type('application/json');

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        if (headers) {
          request.set(headers);
        }

        request.end((err, { body } = {}) => {
          if (err) {
            reject(body || err);
          } else {
            resolve(body);
          }
        });
      });
    });
  }
  empty() {}
}

export default new ApiService();
