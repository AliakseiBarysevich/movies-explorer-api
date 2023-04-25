/* eslint-disable no-unused-vars */
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUser, updateUserInfo,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = usersRoutes;
