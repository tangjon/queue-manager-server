const config = require('./SECRET.js');
// allow multiple statments in config
config['multipleStatements'] = true;
const connection = require('mysql').createConnection(config);
connection.connect();


module.exports = connection;