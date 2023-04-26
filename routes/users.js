const express = require('express');
const { userUpdateValidation } = require('../middlewares/serverDataValidation');
const {
  getCurrentUser, updateUserInfo,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', userUpdateValidation, updateUserInfo);

module.exports = usersRoutes;
