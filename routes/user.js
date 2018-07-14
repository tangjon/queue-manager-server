const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const HttpStatus = require('http-status-codes');

/*
* ============================
* GETTERS
* ============================
* */

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

// GET ALL USERS w/o details
router.get('/', function (req, res) {
    const query = 'SELECT * FROM user';
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).json(results)
        }
        else {
            handleError(error, res);
        }
    });
});

// GET SPECIFIC USER
router.get('/:id/', function (req, res) {
    const query = 'SELECT * FROM user where user_id =' + connection.escape(req.params['id']);
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).json(results)
        }
        else {
            handleError(error, res);
        }
    });
});

// GET SPECIFIC USER INCIDENTS
router.get('/:id/incidents/', function (req, res) {
    const query = `SELECT i.incident_id, i.log_id, p.short_name, ael.timestamp, p.product_id
    FROM incident i, user u, product p, actionentrylog ael WHERE ael.log_id = i.log_id and i.product_id = p.product_id and u.user_id = ` + connection.escape(req.params['id']) + ' ORDER BY i.incident_id DESC';
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).json(results)
        }
        else {
            handleError(error, res);
        }
    });
});

// GET SPECIFIC USER PRODUCTS
router.get('/:id/products/', function (req, res) {
    const query = `SELECT * FROM user_supports_product usp WHERE usp.user_id = ${connection.escape(req.params['id'])};`; 
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).json(results)
        }
        else {
            handleError(error, res);
        }
    });
});


/*
* ============================
* POSTS
* ============================
* */
// TODO not escaped
// ASSIGN USER SUPPORT ROLE
router.post('/:id/products', function (req, res) {
    let query;
    const PRODUCT_SHORT_NAME = req.body.short_name;
    const SUPPORTD = req.body.supported;
    // VALIDATE POST

    // PROCESS POST
    if (parseInt(SUPPORTD)){
        query = `UPDATE user_supports_product usp SET ${PRODUCT_SHORT_NAME} = (SELECT product_id FROM product p WHERE p.short_name = "${PRODUCT_SHORT_NAME}") WHERE usp.user_id = ${connection.escape(req.params['id'])};`
        connection.query(query, function (error, results) {
            if (!error && results.affectedRows) {
                res.sendStatus(HttpStatus.ACCEPTED)
            }
            else {
                handleError(error, res);
            }
        })
    } else {
        query = `UPDATE user_supports_product usp SET ${PRODUCT_SHORT_NAME} = NULL WHERE usp.user_id = ${connection.escape(req.params['id'])};`
        connection.query(query, function (error, results) {
            if (!error && results.affectedRows) {
                res.sendStatus(HttpStatus.ACCEPTED)
            }
            else {
                handleError(error, res);
            }
        })
    }
})

// CREATE A USER
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