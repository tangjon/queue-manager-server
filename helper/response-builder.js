module.exports.ERROR = function (message) {
    return {
        "error": message
    }
};

module.exports.GET = function (data) {
    return {
        "code": 200,
        "status": "OK",
        data

    }
};

module.exports.POST = function (data) {
    return {
        "code": 201,
        "status": "Created",
        data
    }
};

module.exports.PUT = function () {
    return {
        "code": 200,
        "status": "OK"
    }
};

module.exports.DELETE = function () {
    return {
        "code": 200,
        "status": "OK"
    }
};