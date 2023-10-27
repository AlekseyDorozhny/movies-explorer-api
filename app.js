const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const errorHandler = require('./middlewares/errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
}).then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected to db');
});

const app = express();
app.use(cors);

app.use(limiter);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запустился');
});

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
