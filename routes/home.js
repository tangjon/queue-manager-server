const express = require('express');
const router = express.Router();

// This responds with "Hello World" on the homepage
router.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('GET Home API');
 })
 
 // This responds a GET request for abcd, abxcd, ab123cd, and so on
 router.get('/ab*cd', function(req, res) {   
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
 })

module.exports = router