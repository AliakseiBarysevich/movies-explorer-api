const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const getAllMovies = (req, res, next) => {
  Movie.find({}).select('-__v')
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
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки фильма.'));
      } else {
        next(err);
      }
    });
};
const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(() => {
      throw new NotFoundError('Карточка фильма с указанным _id не найдена.');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку фильма.');
      }
      return Movie.findByIdAndDelete(id)
        .then(() => {
          res.send({ message: 'Карточка фильма удалена' });
        });
    })
    .catch(next);
};

module.exports = {
  getAllMovies, createMovie, deleteMovie,
};
