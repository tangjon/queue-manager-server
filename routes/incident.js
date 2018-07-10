const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const USER_PARAMS = [
    "i_number",
    "product_id"
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
            res.status(200).json(results)
        }
    });
});


router.post('/', function (req, res) {
    let query = `INSERT INTO qmtooldb.incident (i_number, product_id) VALUES (,)`;
    connection.query(query, function (error, results) {
        if (error) throw error;
    });
});

// GET Specific incident by id

// Get Specific incident by user

module.exports = router;