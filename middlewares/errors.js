/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Данные введены неправильно' });
    return;
  }

  if (err.name === 'DocumentNotFoundError') {
    res.status(404).send({ message: 'Запрошенный объект не найден' });
    return;
  }

  const { code = 500 } = err;

  res.status(code).send({ message: code === 500 ? 'Произошла ошибка' : err.message });
};
