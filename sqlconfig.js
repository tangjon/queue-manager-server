const config = require('./SECRET.js');
const connection = require('mysql').createConnection(config);
connection.connect();


module.exports = connection;