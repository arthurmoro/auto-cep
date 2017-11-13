function requestError(errorObject) {
    this.name = 'RequestError';
    this.message = errorObject.message;
    this.error = errorObject.error;
}

requestError.prototype = new Error();

module.exports = requestError;