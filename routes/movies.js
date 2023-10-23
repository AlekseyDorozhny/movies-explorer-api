const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getMovies, deleteMovie, createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie,
);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().pattern(/^(http|https):\/\/[^ "]+$/).required(),
      trailerLink: Joi.string().pattern(/^(http|https):\/\/[^ "]+$/).required(),
      thumbnail: Joi.string().pattern(/^(http|https):\/\/[^ "]+$/).required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

module.exports = router;
