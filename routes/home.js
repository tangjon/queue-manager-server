const express = require('express');
const router = express.Router();

// This responds with "Hello World" on the homepage
router.get('/', function (req, res) {
    res.send('Welcome to QM TOOL API, it\'s so good the IP changes everyweek');
});

module.exports = router;