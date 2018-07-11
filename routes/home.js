const express = require('express');
const router = express.Router();

// This responds with "Hello World" on the homepage
router.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('GET Home API');
 })

module.exports = router