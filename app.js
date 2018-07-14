const express = require('express');
const app = express();


// ROUTES
const home = require('./routes/home.js');
const incident = require('./routes/incident.js');
const user = require('./routes/user.js');
const product = require('./routes/product.js');

// MIDDLEWARE
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use('/api/',home);
app.use('/api/incidents/', incident);
app.use('/api/users/', user);
app.use('/api/products/', product);



var server = app.listen(8081, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://localhost:%s", port)
});