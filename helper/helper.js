module.exports.GET = function (response, data) {
    return response.status(200).json({
        "code": 200,
        "status": "OK",
        data
    });
};

module.exports.POST = function (response, data, error) {
    let code;
    error = error || new Error();
    if (error instanceof Error) {
        code = 400;
    } else {
        code = 200;
    }
    return response.status(code).json({
        "code": code,
        "error": error.message,
    });
};

module.exports.PUT = function (response, data, error) {
    let code;
    error = error || new Error();
    if (error instanceof Error) {
        code = 400;
    } else {
        code = 200;
    }
    return response.status(code).json({
        "code": code,
        "error": error.message,
        data,
    });
};

module.exports.DELETE = function (response, results) {
    let code = results.affectedRows === 0 ? 404 : 200;
    return response.status(code).json({
        "code": code
    });
};

module.exports.ERROR = function (response, error) {
    console.error(error);
    console.log(response);
    response.status(404).json({
        "message": error.message,
    });
};

