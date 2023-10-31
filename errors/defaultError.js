class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
}

module.exports = DefaultError;
