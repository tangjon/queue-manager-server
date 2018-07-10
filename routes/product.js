const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const USER_PARAMS = [
    "product_id",
    "short_name"
];
// GET All products
router.get('/', function (req, res) {
    let query = 'SELECT * FROM qmtooldb.product';
    connection.query(query, function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            res.sendStatus(204)
        } else {
            res.status(200).json(results)
        }
    });
});

// CREATE a product
router.post('/', function (req, res) {
    let body = req.body;
    let query = `INSERT INTO qmtooldb.product (short_name) VALUES (${connection.escape(body['short_name'])})`;
    connection.query(query, function (error, results) {
        if (error) {
            switch (error.code) {
                case "ER_DUP_ENTRY":
                    res.sendStatus(409);
                    break
            }
        } else {
            res.status(200)
        }
    });
});

// GET Specific product by short_name
router.get('/:short_name', function (req, res) {
    let query = 'SELECT * FROM qmtooldb.product WHERE short_name=' + connection.escape(req.params['short_name']);
    connection.query(query, function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            res.sendStatus(404)
        } else {
            res.status(200).json(results[0])
        }
    });
});

// DELETE Specific product by short_name
router.delete('/:short_name', function (req, res) {
    let query = 'DELETE FROM qmtooldb.product WHERE short_name=' + connection.escape(req.params['short_name']);
    connection.query(query, function (error, results) {
        if (error) throw error;
        if (results.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;