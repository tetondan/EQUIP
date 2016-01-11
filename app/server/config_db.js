var mongoose = require('mongoose');

mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI_TEST || 'mongodb://localhost/fearlessgerbil';

// if want to force local mongo connection also set LOCATION to local by typing in
// export LOCATION=LOCAL
// then type in node server.js ...etc
if (process.env.LOCATION === "LOCAL") {
	mongoURI = 'mongodb://localhost/fearlessgerbil';
}

mongoose.connect(mongoURI);
// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
 console.log(mongoURI);
});

module.exports = db;