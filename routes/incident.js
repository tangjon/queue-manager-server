const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
// const USER_PARAMS = [
//     "i_number",
//     "product_id"
// ];

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
// GET All INCIDENTS
router.get('/', function (req, res) {
    const query = 'SELECT i.incident_id, i.log_id, p.short_name, u.user_id, u.first_name, u.last_name FROM incident i, user u, product p WHERE i.product_id = p.product_id and u.user_id = i.user_id ORDER BY i.incident_id DESC';
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(200).json(results)
        }
        else {
            handleError(error, res);
        }
    });
});

// ADD INCIDENTS
router.post('/', function(req,res){
    // VALIDATE POST

    // PROCESS POST
    let product_short_name = "BW4"
    let user_id = "i100003";
    const query = `INSERT INTO incident (user_id, product_id) SELECT '${user_id}', (SELECT p.product_id FROM product p WHERE p.short_name = '${product_short_name}');`
    connection.query(query, function (error, results) {
        if (!error && results.length) {
            res.status(201).json(results)
        }
        else {
            handleError(error, res);
        }
    });
})

module.exports = router;