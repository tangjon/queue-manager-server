const ResponseBuilder = require('../helper/response-builder.js');

function QMError(message) {
    Error.captureStackTrace(this);
    this.message = message;
    this.name = "QmError";
 }

module.exports.handleError = function (error, response) {
    console.error(error)
    console.log(response);
    response.status(404).json({
        "message" : error.message,
    });
};