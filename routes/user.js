const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const USER_PARAMS = [
    "i_number",
    "first_name",
    "last_name",
    "is_available",
    "usage_percent",
    "current_q_days",
    "incident_threshold",
];

// GET ALL USERS
router.get('/', function (req, res) {
    let query = 'SELECT * FROM user';
    connection.query(query, function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            res.send("No Data")
        } else {
            res.send(JSON.stringify(results))
        }
    });
});
router.post('/', function (req, res) {
    let body = req.body;
    USER_PARAMS.forEach(element => {
        if (body[element] == null) {
            const error_msg = `Missing '${element}' parameter`;
            res.status(400).send({
                'error': error_msg
            });
            throw Error(error_msg)
        }
    });
    let query = `INSERT INTO qmtooldb.user (i_number, first_name, last_name, is_available,usage_percent,current_q_days,incident_threshold) 
    VALUES (${connection.escape(body['i_number'])}, 
        ${connection.escape(body['first_name'])},  
        ${connection.escape(body['last_name'])}, 
        ${connection.escape(body['is_available'])},
        ${connection.escape(body['usage_percent'])},
        ${connection.escape(body['current_q_days'])},
        ${connection.escape(body['incident_threshold'])})`;

    connection.query(query, function (error) {
            if (error) {
                switch (error.code) {
                    case "ER_DUP_ENTRY":
                        res.sendStatus(409);
                        break
                }
            } else {
                res.status(201).location(req.baseUrl + '/' + connection.escape(body['i_number'])).send();
            }
        }
    )
});

// GET SPECIFIC USER
router.get('/:id/', function (req, res) {
    let query = 'SELECT * FROM `qmtooldb`.`user` where i_number =' + connection.escape(req.params['id']);
    connection.query(query, function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            res.sendStatus(404)
        } else {
            res.status(200).json(results[0])
        }
    });
});

// UPDATE USER
router.put('/:id/', function (req, res) {
    let body = req.body;
    USER_PARAMS.forEach(element => {
        if (body[element] == null) {
            const error_msg = `Missing '${element}' parameter`;
            res.status(400).send({
                'error': error_msg
            });
            throw error(error_msg)
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
    connection.query(query, function (error, results) {
        if (error) {
            res.status(400).json({
                'error': error.message
            });
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

// DELTE Specific user
router.delete('/:id/', function (req, res) {
    let body = req.body;
    let query = `DELETE FROM qmtooldb.user where i_number = ${connection.escape(req.params['id'])}`;
    connection.query(query, function (error, results) {
        if (error) {
            res.status(400).send({
                "error": error
            })
        }
        if (results.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;