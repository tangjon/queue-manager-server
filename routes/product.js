const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const sssssss = require('../helper/response-builder.js');
const Helper = require('../helper/error.js');
const ResponseBuilder = require('../helper/helper.js');
// ============================
// GETTERS
// ============================

/**
 * GET All products
 * @return
 * @example
 */
router.get('/', function (req, res) {
    let query = 'SELECT * FROM product';
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            ResponseBuilder.GET(results)
        }
        else {
            ResponseBuilder.ERROR(res, error)
        }
    });
});

/**
 * GET Specific product by short_name
 * @return
 * @example
 */
router.get('/:short_name', function (req, res) {
    let query = 'SELECT * FROM product WHERE short_name=' + connection.escape(req.params['short_name']);
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            ResponseBuilder.GET(results)

        }
        else {
            ResponseBuilder.ERROR(res, error)
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
 * {
    short_name : "NW"
    }
 */
router.post('/', function (req, res) {
    const body = req.body;

    if (!(/\s/.test(body['short_name']))) {
        // Insert into the product table
        const qAddtoProductTable = `INSERT INTO product (short_name) VALUES (${connection.escape(body['short_name'])});`;
        // Insert into user supports product table
        const qAddColumnToUserSupportTbl = `ALTER TABLE user_supports_product ADD ${connection.escape(body['short_name']).replace(/['"]+/g, '')} INT(11) NULL DEFAULT NULL, ADD CONSTRAINT ${connection.escape(body['short_name']).replace(/['"]+/g, '')} FOREIGN KEY (${connection.escape(body['short_name']).replace(/['"]+/g, '')}) REFERENCES product (product_id) ON DELETE SET NULL ON UPDATE CASCADE;`;
        connection.query(qAddtoProductTable + qAddColumnToUserSupportTbl, function (error, results) {

            if (error) {
                ResponseBuilder.ERROR(res, error)
            } else {
                res.location(req.baseUrl + '/product/' + connection.escape(body['short_name']));
                ResponseBuilder.POST(res)
            }
        });
    } else {
        ResponseBuilder.POST(res, new Error("Not a valid input"))
    }

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
 * {
    short_name : "NW"
    }
 */

router.delete('/:short_name', function (req, res) {
    // Remove product from product table
    const qDeleteProduct = `DELETE FROM product WHERE short_name=${connection.escape(req.params['short_name'])};`;
    // Remove product column from user support product table
    const qDeleteUserSupport = `ALTER TABLE user_supports_product DROP FOREIGN KEY ${connection.escape(req.params['short_name']).replace(/['"]+/g, '')};` + `ALTER TABLE user_supports_product DROP COLUMN ${connection.escape(req.params['short_name']).replace(/['"]+/g, '')};`;

    connection.query(qDeleteProduct + qDeleteUserSupport, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            ResponseBuilder.DELETE(res, results)
        }
    });
});

module.exports = router;