const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const ResponseBuilder = require('../helper/helper.js');

// ============================
// GETTERS
// ============================


router.get('/actions', function (req, res) {
    const query = "SELECT * FROM action a ORDER BY a.action_id ASC;";
    connection.query(query, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            ResponseBuilder.GET(res, results)
        }
    });
});

// GET All LOGS
router.get('/', function (req, res) {
    const query = 'SELECT TRIM(CONCAT(u.first_name, " ", u.last_name)) AS affected_user_name, ale.detail, ale.logger_id, ale.affected_user_id , a.action_id, a.description, ale.timestamp FROM actionentrylog ale, action a, user u WHERE a.action_id = ale.action_id and u.user_id = ale.affected_user_id ORDER BY ale.timestamp DESC;';
    connection.query(query, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            ResponseBuilder.GET(res, results)
        }
    });
});

// ============================
// POST
// ============================
/**
 * CREATE A LOG
 * @return
 * @example {
    "logger_id" : "i123",
    "affected_user_id" : "i132",
    "action_id" : "2",
    "detail": "0 to 1 NW"
    }
 */

router.post('/', function (req, res) {
    const loggerId = req.body['logger_id'], actionId = req.body['action_id'],
        affectUserId = req.body['affected_user_id'], detail = req.body['detail'];
    if (loggerId && actionId && affectUserId) {
        const query = "INSERT INTO actionentrylog ( logger_id, action_id, affected_user_id, detail) VALUES " +
            `(${connection.escape(loggerId)} , ${connection.escape(actionId)}, ${connection.escape(affectUserId)}, ${connection.escape(detail)});`;
        connection.query(query, function (error, results) {
            if (error) {
                ResponseBuilder.ERROR(res, error)
            } else {
                ResponseBuilder.GET(res, results)
            }
        });
    } else {
        ResponseBuilder.ERROR(res, new Error("Invalid Params"))
    }
});

/**
 * Reset Logs
 * @return
 * @example {
    "reset_boolean" : "true"
    }
 */
router.post('/reset',function (req, res) {
    const reset_boolean = JSON.parse(req.body['reset_boolean']);
    const query = "DELETE FROM actionentrylog WHERE 1 = 1";
    if (reset_boolean === true) {
        connection.query(query, function (error, results) {
            if (error) {
                ResponseBuilder.ERROR(res, error)
            } else {
                ResponseBuilder.POST(res)
            }
        });
    } else {
        ResponseBuilder.ERROR(res, "invalid paramaters: " + req.body['reset_boolean'])
    }
});

// ============================
// PUT
// ============================

// ============================
// DELETE
// ============================


module.exports = router;