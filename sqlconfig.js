const config_import = require('./SECRET.js');
let config = config_import.dev;
switch (process.argv[2]) {
    case "dev":
        config = config_import.dev
        break;
    case "prod":
        config = config_import.prod
        break;
    case "sandbox":
         config = config_import.sandbox
    default:
        config = config_import.dev
        break;
}
// allow multiple statments in config
config['multipleStatements'] = true;
const connection = require('mysql').createConnection(config);
connection.connect();


module.exports = connection;