const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const ResponseBuilder = require('../helper/response-builder.js');
const Error = require('../helper/error.js');

// ============================
// GETTERS
// ============================

/**
 * GET ALL USERS w/o details
 * @return
 * @example
 */
router.get('/', function (req, res) {
    const query = 'SELECT * FROM user';
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
 * GET SPECIFIC USER
 * @return
 * @example
 */
router.get('/:id/', function (req, res) {
    const query = 'SELECT * FROM user where user_id =' + connection.escape(req.params['id']);
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
 * GET SPECIFIC USER INCIDENTS
 * @return
 * @example
 */
router.get('/:id/incidents/', function (req, res) {
    const query = `SELECT i.incident_id, i.log_id, p.short_name, ael.timestamp, p.product_id
    FROM incident i, user u, product p, actionentrylog ael WHERE ael.log_id = i.log_id and i.product_id = p.product_id and u.user_id = ` + connection.escape(req.params['id']) + ' ORDER BY i.incident_id DESC';
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
 * GET SPECIFIC USER PRODUCTS
 * @return
 * @example
 */
router.get('/:id/products/', function (req, res) {
    const query = `SELECT * FROM user_supports_product usp WHERE usp.user_id = ${connection.escape(req.params['id'])};`; 
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
// PUT
// ============================

/**
 * Change support products of user
 * @return
 * @example
 */
router.put('/:id/products', function (req, res) {
    let query;
    const PRODUCT_SHORT_NAME = req.body.short_name;
    const SUPPORTD = req.body.supported;
    // VALIDATE POST

    // PROCESS POST
    if (parseInt(SUPPORTD)){
        query = `UPDATE user_supports_product usp SET ${PRODUCT_SHORT_NAME} = (SELECT product_id FROM product p WHERE p.short_name = "${PRODUCT_SHORT_NAME}") WHERE usp.user_id = ${connection.escape(req.params['id'])};`;
        connection.query(query, function (error, results) {
            if (!error && results.affectedRows) {
                res.status(200).json(ResponseBuilder.PUT())
            }
            else {
                Error.handleError(error, res);
            }
        })
    } else {
        query = `UPDATE user_supports_product usp SET ${PRODUCT_SHORT_NAME} = NULL WHERE usp.user_id = ${connection.escape(req.params['id'])};`;
        connection.query(query, function (error, results) {
            if (!error && results.affectedRows) {
                res.status(200).json(ResponseBuilder.PUT())
            }
            else {
                Error.handleError(error, res);
            }
        })
    }
});

/**
 * UPDATE USER
 * @return
 * @example
 */
router.put('/:id/', function (req, res) {
    let body = req.body;
    // VALIDATE POST
    USER_PARAMS.forEach(element => {
        if (body[element] == null) {
            const error_msg = `Missing '${element}' parameter`;
            res.status(400).send({
                'error': error_msg
            });
            throw error(error_msg)
        }
    });
    // PROCESS POST
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

// ============================
// POST
// ============================

/**
 * CREATE USER
 * @return
 * @example
 */
router.post('/', function (req, res) {
    // VALIDATE POST
    const body = req.body;
    USER_PARAMS.forEach(element => {
        if (body[element] == null) {
            const error_msg = `Missing '${element}' parameter`;
            res.status(400).send({
                'error': error_msg
            });
            throw Error(error_msg)
        }
    });
    // PROCESS POST
    const query = `INSERT INTO qmtooldb.user (i_number, first_name, last_name, is_available,usage_percent,current_q_days,incident_threshold) 
    VALUES (${connection.escape(body['i_number'])}, 
        ${connection.escape(body['first_name'])},  
        ${connection.escape(body['last_name'])}, 
        ${connection.escape(body['is_available'])},
        ${connection.escape(body['usage_percent'])},
        ${connection.escape(body['current_q_days'])},
        ${connection.escape(body['incident_threshold'])})`;

    connection.query(query, function (error) {
            if (!error) {
                res.status(201).location(req.baseUrl + '/' + connection.escape(body['i_number'])).send();
            } else {
                Error.handleError(error, res);
            }
        }
    )
});

/*
* ============================
* DELETE
* ============================
* */

/**
 * DELETE USER
 * @return
 * @example
 */
router.delete('/:id/', function (req, res) {
    let body = req.body;
    let query = `DELETE FROM qmtooldb.user where i_number = ${connection.escape(req.params['id'])}`;
    connection.query(query, function (error, results) {
        if (error) {
            handleError();
        } else {
            res.status(200).json(ResponseBuilder.DELETE())
        }
    });
});

module.exports = router;