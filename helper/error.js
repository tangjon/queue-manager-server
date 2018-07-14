const ResponseBuilder = require('../helper/response-builder.js');
module.exports.handleError = function (error, response) {
    if (error) {
        response.status(404).json(ResponseBuilder.ERROR(error))
    } else {
        response.sendStatus(404)
    }

    // if (error) {
    //     switch (error.code) {
    //         // case 'ER_NO_SUCH_TABLE':
    //         //     response.sendStatus(404);
    //         //     break;
    //         // case 'PROTOCOL_CONNECTION_LOST':
    //         //     response.sendStatus(404);
    //         //     break;
    //         default:
    //             response.status(404).json({
    //                 error: error.message
    //             });
    //             break;
    //     }
    // } else {
    //     response.sendStatus(404)
    // }
};