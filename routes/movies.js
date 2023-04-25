const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getAllMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validateUrl } = require('../utils/validateUrl');

const validationConfig = {
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }).unknown(true),
};

const moviesRoutes = express.Router();

moviesRoutes.get('/', getAllMovies);
moviesRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    movieId: Joi.string().length(24).hex(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    owner: Joi.string().length(24).hex(),
  }),
}), createMovie);
moviesRoutes.delete('/:id', celebrate(validationConfig), deleteMovie);

module.exports = moviesRoutes;
