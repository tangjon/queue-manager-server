/*
*
* */
const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const ResponseBuilder = require('../helper/helper.js');


// ============================
// GETTERS
// ============================
// GET All INCIDENTS
router.get('/', function (req, res) {
    const query = 'SELECT i.incident_id, i.log_id, p.short_name, u.user_id, u.first_name, u.last_name FROM incident i, user u, product p WHERE i.product_id = p.product_id and u.user_id = i.user_id ORDER BY i.incident_id DESC';
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
 * ADD INCIDENTS
 * @return
 * @example {
    "user_id" : "i123",
    "product_short_name" : "NW"
    }
 */

router.post('/', function (req, res) {
    // Pre-requesites: Incidents need a log id....
    // STEP 1: Create an incident
    // STPE 2: Create an entrylog entry
    // STEP 3: Attach id to incident

    // VALIDATE POST

    // PROCESS POST
    const product_short_name = req.body.product_short_name;
    const user_id = req.body.user_id;
    const timestamp = req.body.timestamp;
    let query = "";
    if (timestamp) {
        query = `INSERT INTO incident (user_id, product_id, timestamp) SELECT '${user_id}', (SELECT p.product_id FROM product p WHERE p.short_name = '${product_short_name}'), '${timestamp}';`;
    } else {
        query = `INSERT INTO incident (user_id, product_id) SELECT '${user_id}', (SELECT p.product_id FROM product p WHERE p.short_name = '${product_short_name}');`;

    }
    connection.query(query, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            ResponseBuilder.POST(res)
        }
    });
});

/**
 * Reset Incidents
 * @return
 * @example {
    "reset_boolean" : "true"
    }
 */
router.post('/reset',function (req, res) {
    const reset_boolean = JSON.parse(req.body['reset_boolean']);
    const query = "DELETE FROM incident WHERE 1 = 1";
    if (reset_boolean === true) {
        connection.query(query, function (error, results) {
            if (error) {
                ResponseBuilder.ERROR(res, error)
            } else {
                ResponseBuilder.POST(res)
            }
        });
    } else {
        ResponseBuilder.ERROR(res, "invalid paramaters: " + req.body['reset_boolean'])
    }
});

// ============================
// DELETE
// ============================

// Delete the the most recent incident
router.delete('/:user_id/:product_short_name', function (req, res) {
    const user_id = req.params.user_id;
    const product_short_name = req.params.product_short_name;
    const query = `DELETE FROM incident WHERE incident.user_id = ${connection.escape(user_id)} and incident.product_id = (SELECT product_id FROM product WHERE short_name = ${connection.escape(product_short_name)}) ORDER BY incident.timestamp DESC LIMIT 1;`;
    connection.query(query, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            ResponseBuilder.DELETE(res, results)
        }
    });
});
module.exports = router;