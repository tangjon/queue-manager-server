const express = require('express');
const router = express.Router();


const config = require("../app.js")
var connection = require('../sqlconfig');

// GET ALL USERS
router.get('/', function (req, res) {
    let query = 'SELECT * FROM user'
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length == 0){
            res.send("No Data")
        } else {
            res.send(JSON.stringify(results))
        }
    });
})
// TODO ADD USER
router.post('/', function (req, res) {
    let query = 'SELECT * FROM user'
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length == 0){
            res.send("No Data")
        } else {
            res.send(JSON.stringify(results))
        }
    });
})

// GET SPECIFIC USER
router.get('/:id/', function (req, res) {
    let query = 'SELECT * FROM `qmtooldb`.`user` where i_number =' + connection.escape(req.params['id'])
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length == 0){
            res.send("No Data")
        } else {
            res.send(JSON.stringify(results))
        }
    });
})

// UPDATE USER
router.post('/:id/', function(req,res){
    let body = req.body;
    let query = 'SELECT * FROM `qmtooldb`.`user` where i_number =' + connection.escape(req.params['id'])
    let update = 'UPDATE `qmtooldb`.`user` SET `i_number` = "", `first_name` = "", `last_name` = "", `is_available` = "", `usage_percent` = "", `current_q_days` = "", `incident_threshold` = "" WHERE `i_number` = "" '
    let test = 'UPDATE `qmtooldb`.`user` SET `i_number` ='+ connection.escape("i123123")  +' WHERE `i_number` = ' + connection.escape(req.params['id'])
    let q = `UPDATE qmtooldb.user SET 
        i_number = ${connection.escape(body['i_number']) || connection.escape(req.params.id) },
        first_name = ${connection.escape(body['first_name'])}, 
        last_name = ${connection.escape(body['last_name'])}, 
        is_available = ${connection.escape(body['is_available'])}, 
        usage_percent = ${connection.escape(body['usage_percent'])}, 
        current_q_days = ${connection.escape(body['current_q_days'])}, 
        incident_threshold = ${connection.escape(body['incident_threshold'])} 
        WHERE i_number = ${connection.escape(req.params.id)}
    `
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        if (results.length == 0){
            res.send("User does not exist")
        } else {
            res.send(JSON.stringify(results))
        }
    });
})

module.exports = router