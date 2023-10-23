class ConflictingRequestError extends Error {
  constructor(message) {
    super(message);
    this.code = 409;
  }
}

module.exports = ConflictingRequestError;
