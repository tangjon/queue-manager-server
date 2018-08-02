const express = require('express');
const cors = require('cors');
const app = express();
var ws = require('socket.io');

const DEFAULT_PORT = 8082;

app.use(cors({credentials: true, origin: true}));

// ROUTES
const home = require('./routes/home.js');
const incident = require('./routes/incident.js');
const user = require('./routes/user.js');
const product = require('./routes/product.js');
const actionentrylog = require('./routes/actionentrylog.js');
const auth = require('./routes/auth.js');

// MIDDLEWARE
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use('/api/',home);
app.use('/api/incidents/', incident);
app.use('/api/users/', user);
app.use('/api/products/', product);
app.use('/api/actionentrylog/', actionentrylog);
app.use('/api/auth/', auth);


let env = "DEVELOPMENT";
let port = DEFAULT_PORT;
switch (process.argv[2]) {
    case "":
    case "dev":
        env = "DEVELOPMENT";
        port = 8082;
        break;
    case "prod":
        env = "PRODUCTION";
        port = 8081;
        break;
}

const server = app.listen(port, function () {

   var host = server.address().address;
   var port = server.address().port;

    console.log("QM Tool backend [%s ENVIRONMENT] listening at http://localhost:%s", env, port)
});

var io = require('socket.io')(server);
var last_socket_id = "";
io.on('connection', function (socket) {
    console.log("user connected: " + socket.id)
    socket.on('queue modified', function(data){
        last_socket_id = socket.id;
        console.log("queue modifed ",last_socket_id)
        socket.broadcast.emit('new changes', {
            "socket_id" : last_socket_id
        })
    });
});