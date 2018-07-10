const express = require('express');
const router = express.Router();


const connection = require('../sqlconfig');

// GET ALL USERS
router.get('/', function (req, res) {
    let query = 'SELECT * FROM user';
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length == 0) {
            res.send("No Data")
        } else {
            res.send(JSON.stringify(results))
        }
    });
});
// TODO ADD USER
router.post('/', function (req, res) {
    let query = 'SELECT * FROM user';
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            res.send("No Data")
        } else {
            res.send(JSON.stringify(results))
        }
    });
});

// GET SPECIFIC USER
router.get('/:id/', function (req, res) {
    let query = 'SELECT * FROM `qmtooldb`.`user` where i_number =' + connection.escape(req.params['id']);
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            res.status(404).send("No Data")
        } else {
            res.status(404).send(JSON.stringify(results))
        }
    });
});

// UPDATE USER
router.put('/:id/', function (req, res) {
    let body = req.body;
    let params = [
        "i_number",
        "first_name",
        "last_name",
        "is_available",
        "usage_percent",
        "current_q_days",
        "incident_threshold",
    ];

    params.forEach(element => {
        if (body[element] == null) {
            const error_msg = `Missing '${element}' parameter`;
            res.status(400).send({
                'error': error_msg
            });
            throw Error(error_msg)
        }
    });
    let query = `UPDATE qmtooldb.user SET 
        i_number = ${connection.escape(body['i_number']) || connection.escape(req.params.id) },
        first_name = ${connection.escape(body['first_name'])}, 
        last_name = ${connection.escape(body['last_name'])}, 
        is_available = ${connection.escape(body['is_available'])}, 
        usage_percent = ${connection.escape(body['usage_percent'])}, 
        current_q_days = ${connection.escape(body['current_q_days'])}, 
        incident_threshold = ${connection.escape(body['incident_threshold'])} 
        WHERE i_number = ${connection.escape(req.params.id)}
    `;
    connection.query(query, function (error, results, fields) {
        if (error) {
            res.status(400).json({
                'error': error.message
            });
            throw error
        }
        if (results.affectedRows === 0) {
            res.status(404).json({
                "error": "User does not exist"
            })
        } else {
            res.sendStatus(200)
        }
    });
});

module.exports = router;