const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const {
  BAD_REQUEST_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  FORBIDDEN_DELETE_MOVIE_MESSAGE,
  SUCCESSFUL_CARD_DELETION_MESSAGE,
  VALIDATION_ERROR_NAME,
} = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner }).select('-owner')
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MOVIE_ERROR_MESSAGE);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE_MESSAGE);
      }
      return Movie.findByIdAndDelete(id)
        .then(() => {
          res.send({ message: SUCCESSFUL_CARD_DELETION_MESSAGE });
        });
    })
    .catch(next);
};

module.exports = {
  getAllMovies, createMovie, deleteMovie,
};
