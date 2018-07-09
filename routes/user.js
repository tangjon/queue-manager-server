const express = require('express');
const router = express.Router();

// This responds with "Hello World" on the homepage
router.get('/', function (req, res) {
    res.send('GET User API');
 })

module.exports = router