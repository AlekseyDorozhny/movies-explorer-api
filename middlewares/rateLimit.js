const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  message: 'Слишком много запросов за единицу времени. Нужно немножко подождать :)',
  standardHeaders: true,
  legacyHeaders: true,
  skipFailedRequests: true,
});

module.exports = {
  limiter,
};
