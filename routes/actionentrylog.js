const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const ResponseBuilder = require('../helper/helper.js');

// ============================
// GETTERS
// ============================
// GET All LOGS
router.get('/', function (req, res) {
    const query = 'SELECT ale.logger_id, a.action_id, a.description, ale.custom_description, ale.timestamp FROM actionentrylog ale, action a WHERE a.action_id = ale.action_id;';
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
    "custom_description" : "this is optional"
    }
 */

router.post('/', function (req, res) {
    const loggerId = req.body['logger_id'], actionId = req.body['action_id'],
        affectUserId = req.body['affected_user_id'], customDescription = req.body['custom_description'];
    if (loggerId && actionId && affectUserId) {
        const query = "INSERT INTO actionentrylog ( logger_id, action_id, affected_user_id, custom_description) VALUES " +
            `(${connection.escape(loggerId)} , ${connection.escape(actionId)}, ${connection.escape(affectUserId)}, ${connection.escape(customDescription)});`;
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

// ============================
// PUT
// ============================

// ============================
// DELETE
// ============================


module.exports = router;