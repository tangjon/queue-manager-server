const express = require('express');
const router = express.Router();
const connection = require('../sqlconfig');
const ResponseBuilder = require('../helper/helper.js');
const auth = require('basic-auth')
// This responds with "Hello World" on the homepage

const EPM_CREDENTIALS = {
    "username" : "administrator",
    "password" : "bobobo"
}

router.get('/', function (req, res) {
    var credentials = auth(req)
    if (!credentials || credentials.name !== EPM_CREDENTIALS.username || credentials.pass !== EPM_CREDENTIALS.password) {
        res.statusCode = 401 // forbidden
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.end('Access denied')
    } else {
        res.statusCode = 200 // authorizated
        res.end('Access granted')
    }
});




module.exports = router;