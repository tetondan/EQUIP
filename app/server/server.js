var express = require('express');
var db = require('./config_db');
var app = express();

// connect to mongo database named "fearlessgerbil"
//mongoose.connect('mongodb://localhost/fearlessgerbil');

// configure our server with all the middleware and routing
require('./middleware.js')(app, express);
// start listening to requests on port 8088
app.set('port', process.env.PORT || 8088);
var server = app.listen(app.get('port'), function () {
	console.log('Express Server listening on port' + server.address().port);
});

module.exports = app;
