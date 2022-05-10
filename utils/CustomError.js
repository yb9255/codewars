class CustomError extends Error {
  constructor (error, status, isInSubmission) {
    super(error)
    this.status = status;
    this.message = error.message;
    this.isInSubmission = isInSubmission;
  }
}

module.exports = CustomError;
