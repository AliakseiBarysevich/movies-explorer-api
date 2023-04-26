const express = require('express');
const { movieCreationValidation, movieIdValidation } = require('../middlewares/serverDataValidation');
const {
  getAllMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getAllMovies);
moviesRoutes.post('/', movieCreationValidation, createMovie);
moviesRoutes.delete('/:id', movieIdValidation, deleteMovie);

module.exports = moviesRoutes;
