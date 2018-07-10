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
// This responds with "Hello World" on the homepage

// GET All incidents
router.get('/', function (req, res) {
    let query = 'SELECT * FROM qmtooldb.incident';
    connection.query(query, function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            res.sendStatus(404)
        } else {
            res.status(200).send(JSON.stringify(results))
        }
    });
});

// GET Specific incident by id

// Get Specific incident by user

module.exports = router;