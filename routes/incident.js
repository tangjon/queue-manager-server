const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
// const USER_PARAMS = [
//     "i_number",
//     "product_id"
// ];

// GET All incidents
// GET Specific incident by id
// GET Specific use by id
router.get('/', function (req, res) {
    let query;
    let qParams = req.query;
    if (Object.keys(qParams).length == 0) {
        query = `SELECT * FROM incident INNER JOIN user ON incident.i_number = user.i_number;`
        connection.query(query, function (error, results) {
            if (error) throw error;
            if (results.length === 0) {
                res.sendStatus(404)
            } else {
                res.status(200).json(results)
            }
        });
    } else {
        switch (Object.keys(qParams)[0]) {
            case 'id':
                query = `SELECT i.incident_id, i.logger_id, p.short_name, u.i_number, u.first_name, u.last_name FROM incident i INNER JOIN user u ON i.i_number = u.i_number INNER JOIN product p ON p.product_id = i.product_id  WHERE i.incident_id = ${connection.escape(qParams['id'])};`
                connection.query(query, function (error, results) {
                    if (error) res.sendStatus(404)
                    res.json(results)
                });
                console.log(query)
                break
            case 'i_number':
                query = `SELECT i.logger_id, p.short_name, u.i_number, u.first_name, u.last_name FROM incident i INNER JOIN user u ON i.i_number = u.i_number INNER JOIN product p ON p.product_id = i.product_id WHERE u.i_number = ` + connection.escape(qParams['i_number'])
                connection.query(query, function (error, results) {
                    if (error) res.sendStatus(404)
                    res.json(results)
                });
                break
            case 'logger_id':
                query = `SELECT i.logger_id, p.short_name, u.i_number, u.first_name, u.last_name FROM incident i INNER JOIN user u ON i.i_number = u.i_number INNER JOIN product p ON p.product_id = i.product_id WHERE i.logger_id = ` + connection.escape(qParams['logger_id'])
                connection.query(query, function (error, results) {
                    if (error) res.sendStatus(404)
                    res.json(results)
                });
                break
            default:
                res.sendStatus(404)
        }
    }

});




// router.get('/:id/', function (req, res) {
//     let query = `SELECT i.logger_id, p.short_name, u.i_number, u.first_name, u.last_name FROM incident i INNER JOIN user u ON i.i_number = u.i_number INNER JOIN product p ON p.product_id = i.product_id  WHERE i.incident_id = ${connection.escape(req.params['id'])};`
//     connection.query(query, function (error, results) {
//         if (error) throw error;
//         res.json(results[0])
//     });
// });

// Get Specific incident by user

module.exports = router;