var fs = require('fs');

module.exports.GET = function (response, data) {
    return response.status(200).json({
        "code": 200,
        data
    });
};

module.exports.POST = function (response, error) {
    let code;
    if (error instanceof Error) {
        code = 400;
    } else {
        code = 201;
    }
    error = error || new Error();
    return response.status(code).json({
        "code": code,
        "error": error.message,
    });
};

module.exports.PUT = function (response, error) {
    let code;
    if (error instanceof Error) {
        code = 400;
    } else {
        error = new Error();
        code = 200;
    }
    return response.status(code).json({
        "code": code,
        "error": error.message
    });
};

module.exports.DELETE = function (response, results) {
    let code = results.affectedRows === 0 ? 404 : 200;
    return response.status(code).json({
        "code": code
    });
};

module.exports.ERROR = function (response, error) {
    console.log(error);
    // log-file_YYYY-MM-DD_HH:MM:SS
    const date = new Date();
    let fileName = `log-file_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}_${data.getTime()}.txt`

    var stream = fs.createWriteStream("logs/" + fileName);
    stream.once('open', function (fd) {
        console.log("log file generated: " + fileName);
        stream.write(JSON.stringify(error));
        stream.write("\n");
    });
    response.status(404).json({
        "message": error.message
    });
};

