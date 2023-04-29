const express = require('express');
const { userRegisterValidation, userLoginValidation } = require('../middlewares/serverDataValidation');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_PAGE_ERROR_MESSAGE } = require('../utils/constants');

const routes = express.Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

routes.post('/signup', userRegisterValidation, createUser);
routes.post('/signin', userLoginValidation, login);

routes.use('/users', auth, usersRoutes);
routes.use('/movies', auth, moviesRoutes);
routes.use('*', auth, (req, res, next) => next(new NotFoundError(NOT_FOUND_PAGE_ERROR_MESSAGE)));

module.exports = routes;
