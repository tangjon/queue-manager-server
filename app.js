const express = require('express');
const app = express();

// ROUTES
const home = require('./routes/home.js')
const incident = require('./routes/incident.js')
const user = require('./routes/user.js')

app.use('/api/',home)
app.use('/api/incident', incident)
app.use('/api/user', user)


var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://localhost:%s", port)
})