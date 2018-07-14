const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');


function handleError(error, response) {
    // ERRORS
    if (error) {
        switch (error.code) {
            // case 'ER_NO_SUCH_TABLE':
            //     response.sendStatus(404);
            //     break;
            // case 'PROTOCOL_CONNECTION_LOST':
            //     response.sendStatus(404);
            //     break;
            default:
                response.status(404).json({
                    error: error.message
                });
                break;
        }
    } else {
        response.sendStatus(404)
    }
}

// GET All products
router.get('/', function (req, res) {
    let query = 'SELECT * FROM qmtooldb.product';
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).json(results)
        }
        else {
            handleError(error, res);
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