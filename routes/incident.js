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
        query = `SELECT i.incident_id, i.logger_id, p.short_name, u.i_number, u.first_name, u.last_name
        FROM incident i, user u, product p WHERE i.product_id = p.product_id and u.i_number = i.i_number ORDER BY i.incident_id DESC`
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
                query = `SELECT i.incident_id, i.logger_id, p.short_name, u.i_number, u.first_name, u.last_name
                FROM incident i, user u, product p WHERE i.product_id = p.product_id and u.i_number = i.i_number
                and i.incident_id = ${connection.escape(qParams['id'])} ORDER BY i.incident_id DESC`
                connection.query(query, function (error, results) {
                    if (error) res.sendStatus(404)
                    res.json(results)
                });
                console.log(query)
                break
            case 'i_number':
                query = `SELECT i.incident_id, i.logger_id, p.short_name, u.i_number, u.first_name, u.last_name
                FROM incident i, user u, product p WHERE i.product_id = p.product_id and u.i_number = ${connection.escape(qParams['id'])} ORDER BY i.incident_id DESC`
                connection.query(query, function (error, results) {
                    if (error) res.sendStatus(404)
                    res.json(results)
                });
                break
            case 'logger_id':
                query = `SELECT i.incident_id, i.logger_id, p.short_name, u.i_number, u.first_name, u.last_name
                FROM incident i, user u, product p WHERE i.product_id = p.product_id and u.i_number = i.i_number
                and i.logger_id = ${connection.escape(qParams['logger_id'])} ORDER BY i.incident_id DESC`
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

module.exports = router;