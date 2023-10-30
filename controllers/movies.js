const Movie = require('../models/movie');

const NotEnoughRightsError = require('../errors/NotEnoughRightsError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: `${req.user._id}` })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NotEnoughRightsError('Нельзя удалять фильм другого пользователя');
      }
    })
    // eslint-disable-next-line arrow-body-style
    .then(() => {
      return Movie.findByIdAndRemove(req.params.movieId).orFail()
        .then(() => res.send({ message: 'Фильм успешно удален!' }));
    })
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailerLink, thumbnail,
    movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};
