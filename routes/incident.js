/*
*
* */
const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const Error = require('../helper/error.js');
const Response = require('../helper/response-builder.js');
// GET All INCIDENTS
router.get('/', function (req, res) {
    const query = 'SELECT i.incident_id, i.log_id, p.short_name, u.user_id, u.first_name, u.last_name FROM incident i, user u, product p WHERE i.product_id = p.product_id and u.user_id = i.user_id ORDER BY i.incident_id DESC';
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).send(Response.GET(results));
        }
        else {
            Error.handleError(error, res)
        }
    });
});

// ADD INCIDENTS
// {
//     "user_id" : "i123",
//     "product_short_name" : "NW"
// }
router.post('/', function (req, res) {
    // VALIDATE POST


    // PROCESS POST
    let product_short_name = req.body.product_short_name;
    let user_id = req.body.user_id;
    const query = `INSERT INTO incident (user_id, product_id) SELECT '${user_id}', (SELECT p.product_id FROM product p WHERE p.short_name = '${product_short_name}');`;
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).send(Response.GET(results));
        }
        else {
            Error.handleError(error, res)
        }
    });
});

module.exports = router;