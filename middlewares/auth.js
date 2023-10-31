const jwt = require('jsonwebtoken');

const WrongAuth = require('../errors/WrongAuth');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new WrongAuth('Необходима авторизация');
  }

  req.user = payload;
  next();
};
