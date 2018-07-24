const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const ResponseBuilder = require('../helper/helper.js');
// ============================
// GETTERS
// ============================
/**
 * DESCRIPTION
 * @return
 * @example
 */


/**
 * GET ALL USERS with ALL DETAILS
 * @return
 * @example
 */
router.get('/', function (req, res) {
    const qUser = "SELECT * FROM user u, user_supports_product usp WHERE u.user_id = usp.user_id ORDER BY u.user_id;"; // results [1]
    const qProducts = "SELECT short_name FROM product;"; // results [0]
    const qIncidentCount = "SELECT i.user_id, p.short_name, COUNT(*) as 'incident_count' FROM incident i,product p WHERE p.product_id = i.product_id GROUP BY i.product_id, i.user_id ORDER BY i.user_id;"; // result [2]
    connection.query(qProducts + qUser + qIncidentCount, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error);
        } else {
            const qProductResult = results[0], qUserResult = results[1], qIncidentResult = results[2];
            // list of products as array
            let arrayProducts = [];
            qProductResult.forEach(product => {
                arrayProducts.push(product.short_name)
            });

            let processedResults = [];
            // process and structure json response
            qUserResult.forEach(u => {
                let tmpObj = {
                    'supported_products': {},
                    'incident_counts': {}
                };
                Object.keys(u).forEach(key => {
                    if (!arrayProducts.includes(key)) {
                        // assign meta info
                        tmpObj[key] = u[key];
                    } else {
                        // assign support products and initalize incident counts
                        tmpObj.supported_products[key] = u[key];
                        tmpObj.incident_counts[key] = 0;
                    }
                });

                // set incident count
                let incidentEntry = qIncidentResult.filter(el => el.user_id === u.user_id);
                incidentEntry.forEach(el => tmpObj.incident_counts[el.short_name] = el.incident_count);
                processedResults.push(tmpObj);
            });
            ResponseBuilder.GET(res, processedResults)
        }
    });
});

/**
 * GET queue manager
 * @return
 * @example
 */
router.get('/qm', function (req, res) {
    const query = "SELECT * FROM qmuser qm, user u WHERE qm.user_id = u.user_id;";
    connection.query(query, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error);
        } else {
            ResponseBuilder.GET(res, results[0])
        }
    });
});

/**
 * GET SPECIFIC USER
 * @return
 * @example
 */
router.get('/:id/', function (req, res) {
    const qUser = `SELECT * FROM user u, user_supports_product usp WHERE u.user_id = usp.user_id and u.user_id = '${req.params.id}';`; // results [1]
    const qProducts = "SELECT short_name FROM product;"; // results [0]
    const qIncidentCount = `SELECT i.user_id, p.short_name, COUNT(*) as 'incident_count' FROM incident i,product p WHERE p.product_id = i.product_id and i.user_id = '${req.params.id}'  GROUP BY i.product_id, i.user_id ORDER BY i.user_id;`; // result [2]
    connection.query(qProducts + qUser + qIncidentCount, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            const qProductResult = results[0], qUserResult = results[1], qIncidentResult = results[2];
            if (qUserResult.length) {
                // list of products as array
                let arrayProducts = [];
                qProductResult.forEach(product => {
                    arrayProducts.push(product.short_name)
                });

                let processedResults = [];
                // process and structure json response
                qUserResult.forEach(u => {
                    let tmpObj = {
                        'supported_products': {},
                        'incident_counts': {}
                    };
                    Object.keys(u).forEach(key => {
                        if (!arrayProducts.includes(key)) {
                            // assign meta info
                            tmpObj[key] = u[key];
                        } else {
                            // assign support products and initalize incident counts
                            tmpObj.supported_products[key] = u[key];
                            tmpObj.incident_counts[key] = 0;
                        }
                    });

                    // set incident count
                    let incidentEntry = qIncidentResult.filter(el => el.user_id === u.user_id);
                    incidentEntry.forEach(el => tmpObj.incident_counts[el.short_name] = el.incident_count);
                    processedResults.push(tmpObj);
                });
                ResponseBuilder.GET(res, processedResults[0])
            } else {
                ResponseBuilder.ERROR(res, new Error("User not found"))
            }
        }
    });
});

/**
 * GET SPECIFIC USER INCIDENTS
 * @return
 * @example
 */
router.get('/:id/incidents/', function (req, res) {
    const query = `SELECT i.incident_id, i.log_id, p.short_name, ael.timestamp, p.product_id FROM product p, incident i, actionentrylog ael WHERE p.product_id = i.product_id and i.log_id = ael.log_id and i.user_id = ${connection.escape(req.params['id'])} ORDER BY i.incident_id DESC;`;
    connection.query(query, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res.error)
        }
        else {
            ResponseBuilder.GET(res, results)
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
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            ResponseBuilder.GET(res, results)
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
    if (parseInt(SUPPORTD)) {
        query = `UPDATE user_supports_product usp SET ${PRODUCT_SHORT_NAME} = (SELECT product_id FROM product p WHERE p.short_name = "${PRODUCT_SHORT_NAME}") WHERE usp.user_id = ${connection.escape(req.params['id'])};`;
        connection.query(query, function (error, results) {
            if (!error && results.affectedRows) {
                ResponseBuilder.PUT(res)
            }
            else {
                ResponseBuilder.ERROR(error);
            }
        })
    } else {
        query = `UPDATE user_supports_product usp SET ${PRODUCT_SHORT_NAME} = NULL WHERE usp.user_id = ${connection.escape(req.params['id'])};`;
        connection.query(query, function (error, results) {
            if (!error && results.affectedRows) {
                ResponseBuilder.PUT(res)
            }
            else {
                ResponseBuilder.ERROR(error);

            }
        })
    }
});
/**
 * CHANGE QM
 * @return
 * @example
 * {
     "user_id" : "i865689"
 }
 */
router.put('/qm/', function (req, res) {
    // VALIDATE POST
    const body = req.body;
    // PROCESS POST
    const query = "UPDATE qmuser SET user_id =" + connection.escape(body.user_id);
    connection.query(query, function (error, results) {
            if (error) {
                ResponseBuilder.ERROR(res, error)
            } else {
                ResponseBuilder.PUT(res, results)
            }
        }
    )
});

/**
 * UPDATE USER
 * @return
 * @example
 * {
    user_id : ""
    first_name : ""
    last_name : ""
    is_available : ""
    usage_percent : ""
    current_q_days : ""
    incident_threshold : ""
}
 */
router.put('/:id/', function (req, res) {
    let body = req.body;
    // PROCESS POST
    let query = `UPDATE qmtooldb.user SET
user_id = ${connection.escape(body['user_id']) || connection.escape(req.params.id)},
first_name = ${connection.escape(body['first_name'])},
last_name = ${connection.escape(body['last_name'])},
is_available = ${connection.escape(body['is_available'])},
usage_percent = ${connection.escape(body['usage_percent'])},
current_q_days = ${connection.escape(body['current_q_days'])},
incident_threshold = ${connection.escape(body['incident_threshold'])}
WHERE user_id = ${connection.escape(req.params.id)}`;
    connection.query(query, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error);
        } else {
            if (results.affectedRows === 0) {
                ResponseBuilder.PUT(res, results, new Error("User not found"))
            } else {
                ResponseBuilder.PUT(res, results);
            }
        }

    });
});

/**
 * UPDATE USER SUPPORT PRODUCTS
 * @return
 * @example
 * {
 *    supported: true / false
 *  }
 */
router.put('/:id/:product_short_name', function (req, res) {
    const user_id = req.params.id, short_name = req.params.product_short_name;
    let query;
    if (req.body['supported'] === true) {
        query = `UPDATE user_supports_product usp SET ${short_name} = (SELECT product_id FROM product p WHERE p.short_name = "${short_name}") WHERE usp.user_id = '${user_id}';`;
    } else if (req.body['supported'] === false) {
        query = `UPDATE user_supports_product usp SET ${short_name} = ${null} WHERE usp.user_id = '${user_id}';`;
    }
    connection.query(query, function (error) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            res.location(req.baseUrl + '/product/');
            ResponseBuilder.PUT(res);
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
    // PROCESS POST
    // const query = `INSERT INTO qmtooldb.user (user_id, first_name, last_name, is_available,usage_percent,current_q_days,incident_threshold)
    // VALUES (${connection.escape(body['user_id'])},
    //     ${connection.escape(body['first_name'])},
    //     ${connection.escape(body['last_name'])},
    //     ${connection.escape(body['is_available'])},
    //     ${connection.escape(body['usage_percent'])},
    //     ${connection.escape(body['current_q_days'])},
    //     ${connection.escape(body['incident_threshold'])})`;

    const query = `INSERT INTO qmtooldb.user (user_id, first_name, last_name)
VALUES (${connection.escape(body['user_id'])},
${connection.escape(body['first_name'])},
${connection.escape(body['last_name'])})`;

    connection.query(query, function (error) {
            if (error) {
                ResponseBuilder.ERROR(res, error)
            } else {
                res.location(req.baseUrl + '/' + body['user_id']);
                ResponseBuilder.POST(res)
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
    let query = `DELETE FROM user WHERE user_id = ${connection.escape(req.params['id'])}`;
    connection.query(query, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            ResponseBuilder.DELETE(res, results)
        }
    });
});

module.exports = router;