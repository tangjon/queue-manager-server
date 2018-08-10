const config_import = require('./SECRET.js');
const mysql = require('mysql')
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
// const connection = require('mysql').createConnection(config);
// connection.connect();

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(config);// Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      console.log("error occurred", err);                                  // server variable configures this)
    }
  });
}

handleDisconnect();

setInterval(()=>{
  connection.ping();
}, 60000)

module.exports = connection;