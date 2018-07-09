
var mysql      = require('mysql');
const config = require('./SECRET.js')
var connection = mysql.createConnection(config)
connection.connect()
module.exports = connection