const express = require('express');
const cors = require('cors');
const app = express();
var t = require('http').Server(app);
var io = require('socket.io')(t);

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

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
});