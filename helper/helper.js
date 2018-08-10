var fs = require('fs');

module.exports.GET = function (response, data) {
    return response.status(200).json({
        "code": 200,
        data
    });
};

module.exports.POST = function (response, error) {
    if (error instanceof Error) {
        return response.status(400).json({
            "code": 400,
            "error": error.message,
        });
    } else {
        return response.status(201).json({
            "code": 201,
            "error": "",
        });
    }

};

module.exports.PUT = function (response, error) {
    if (error instanceof Error) {
        code = 400;
        return response.status(400).json({
            "code": 400,
            "error": error.message,
        });
    } else {
        return response.status(200).json({
            "code": 200,
            "error": "",
        });
    }
};

module.exports.DELETE = function (response, results) {
    let code = results.affectedRows === 0 ? 404 : 200;
    return response.status(code).json({
        "code": code
    });
};

module.exports.ERROR = function (response, error) {
    // log-file_YYYY-MM-DD_HH:MM:SS
    const date = new Date();
    let fileName = `log-file_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}_${date.getTime()}.txt`

    var stream = fs.createWriteStream("logs/" + fileName);
    stream.once('open', function (fd) {
        console.log("ERROR: log file generated: " + fileName);
        if (error instanceof Error) {
            stream.write(error.stack);
            stream.write("\n");
        }
        else {
            stream.write(JSON.stringify(error));
            stream.write("\n");
        }

    });
    console.log((error instanceof Error) ? error.message : error)
    response.status(404).json({
        "message":  (error instanceof Error) ? error.message : error
    });
};

