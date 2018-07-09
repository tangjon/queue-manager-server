const express = require('express');
const router = express.Router();


const config = require("../app.js")
var connection = require('../sqlconfig');


router.get('/', function (req, res) {

    connection.connect()
 
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
      res.send('GET User API ' +  results[0].solution);
    });
    
    connection.end();
    
 })

module.exports = router