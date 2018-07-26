const express = require('express');
const cors = require('cors');
const app = express();
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



const server = app.listen(8081, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://localhost:%s", port)
});