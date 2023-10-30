const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ConflictingRequestError = require('../errors/ConflictingRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.sendStatus(200);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      const user = User.create({
        name, email, password: hash,
      });
      return user;
    })
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingRequestError('Данный Email уже зарегестрирован'));
        return;
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  ).orFail()
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingRequestError('Данный Email уже зарегестрирован'));
        return;
      }
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => next(err));
};
