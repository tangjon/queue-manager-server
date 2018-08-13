const express = require('express');
const cors = require('cors');
const app = express();
var ws = require('socket.io');

const DEFAULT_PORT = 8082;

app.use(cors({ credentials: true, origin: true }));

// ROUTES
const home = require('./routes/home.js');
const incident = require('./routes/incident.js');
const user = require('./routes/user.js');
const product = require('./routes/product.js');
const actionentrylog = require('./routes/actionentrylog.js');
const auth = require('./routes/auth.js');
const connection = require('./sqlconfig');
// MIDDLEWARE
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use('/api/', home);
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

// WEBSOCKET SERVER

var io = require('socket.io')(server);
var last_socket_id = "";
io.on('connection', function (socket) {
    console.log("user connected: " + socket.id)
    socket.on('queue modified', function (data) {
        last_socket_id = socket.id;
        console.log("queue modifed ", last_socket_id)
        socket.broadcast.emit('queue modified', {
            "socket_id": last_socket_id
        })
    });

    socket.on('notifications', function (data) {
        console.log("notifications");
        console.log(data)
    })
    checkQueueDaysUpToDate(socket)
});

// CHRON JOBS

function checkQueueDaysUpToDate(socket) {
    const query = 'SELECT TRIM(CONCAT(u.first_name, " ", u.last_name)) AS affected_user_name, ale.detail, ale.logger_id, ale.affected_user_id , a.action_id, a.description, ale.timestamp FROM actionentrylog ale, action a, user u WHERE u.user_id != "i100000" and a.action_id = ale.action_id and u.user_id = ale.affected_user_id ORDER BY ale.timestamp DESC;';
    const query2 = "SELECT * FROM user u, user_supports_product usp WHERE u.user_id = usp.user_id && u.user_id != 'i100000' ORDER BY u.user_id;"
    connection.query(query + query2, function (error, results) {
        if (error) {
            ResponseBuilder.ERROR(res, error)
        } else {
            let users = results[1], logs = results[0];
            let obj = {}; // stores date of last queue day change
            users.forEach((u) => {
                let userLog = results[0].find((log) => log.action_id === 5 && u.user_id === log.affected_user_id);
                obj[u.user_id] = userLog ? userLog.timestamp : "";
            });
            let flag = false;
            let fUsers = [];
            for (let key of Object.keys(obj)) {
                if (new Date(obj[key]).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)) {
                    flag = true;
                    fUsers.push(key)
                }
            }
            if (flag) {
                socket.emit("notifications", {
                    "message": "Queue Days are not updated! " + fUsers.toString()
                });
            }
        }
    });
}