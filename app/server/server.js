var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "fearlessgerbil"
mongoose.connect('mongodb://localhost/fearlessgerbil');

// configure our server with all the middleware and routing
require('./middleware.js')(app, express);
require('./routes.js')(app, express);

// start listening to requests on port 8088
app.listen(8088);
module.exports = app;

