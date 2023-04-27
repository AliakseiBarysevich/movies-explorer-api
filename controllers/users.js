const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const {
  NOT_FOUND_USER_ERROR_MESSAGE,
  INCORRECT_ID_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
  DUPLICATE_EMAIL_ERROR_MESSAGE,
  VALIDATION_ERROR_NAME,
  CAST_ERROR_NAME,
} = require('../utils/constants');

const MONGO_EMAIL_DUPLICATE_ERROR_CODE = 11000;
const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(NOT_FOUND_USER_ERROR_MESSAGE))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === CAST_ERROR_NAME) {
        next(new BadRequestError(INCORRECT_ID_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.status(201).send({
        name: user.name, email: user.email,
      }))
      .catch((err) => {
        if (err.name === VALIDATION_ERROR_NAME) {
          next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
        }
        if (err.code === MONGO_EMAIL_DUPLICATE_ERROR_CODE) {
          next(new ConflictingRequestError(DUPLICATE_EMAIL_ERROR_MESSAGE));
        } else {
          next(err);
        }
      }));
};
const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(NOT_FOUND_USER_ERROR_MESSAGE));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      }
      if (err.code === MONGO_EMAIL_DUPLICATE_ERROR_CODE) {
        next(new ConflictingRequestError(DUPLICATE_EMAIL_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser, createUser, updateUserInfo, login,
};
