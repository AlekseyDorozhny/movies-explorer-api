/* eslint-disable consistent-return */
/* eslint-disable no-console */
const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://dorozha.mesto.nomoredomainsrocks.ru',
  'https://dorozha.mesto.nomoredomainsrocks.ru',
  'http://www.dorozha.mesto.nomoredomainsrocks.ru',
  'https://www.dorozha.mesto.nomoredomainsrocks.ru',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

module.exports = {
  cors,
};
