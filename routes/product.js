const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const ResponseBuilder = require('../helper/response-builder.js');
const Error = require('../helper/error.js');

// ============================
// GETTERS
// ============================

/**
 * GET All products
 * @return
 * @example
 */
router.get('/', function (req, res) {
    let query = 'SELECT * FROM qmtooldb.product';
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).json(ResponseBuilder.GET(results))
        }
        else {
            Error.handleError(error, res);
        }
    });
});

/**
 * GET Specific product by short_name
 * @return
 * @example
 */
router.get('/:short_name', function (req, res) {
    let query = 'SELECT * FROM qmtooldb.product WHERE short_name=' + connection.escape(req.params['short_name']);
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).json(ResponseBuilder.GET(results))
        }
        else {
            Error.handleError(error, res);
        }
    });
});

// ============================
// POST
// ============================

/**
 * CREATE a product
 * @return
 * @example
 */
router.post('/', function (req, res) {
    let body = req.body;
    let query = `INSERT INTO qmtooldb.product (short_name) VALUES (${connection.escape(body['short_name'])})`;
    connection.query(query, function (error) {
        if (error) {
            Error.handleError(error, res);
        } else {
            res.status(201).location(req.baseUrl + '/product/' + connection.escape(body['short_name'])).send();
        }
    });
});

// ============================
// PUT
// ============================




// ============================
// DELETE
// ============================

/**
 * DELETE Specific product by short_name
 * @return
 * @example
 */
router.delete('/:short_name', function (req, res) {
    let query = 'DELETE FROM qmtooldb.product WHERE short_name=' + connection.escape(req.params['short_name']);
    connection.query(query, function (error, results) {
        if (error) {
            Error.handleError(error, res);
        } else {
            res.status(200).json(ResponseBuilder.DELETE())
        }
    });
});

module.exports = router;