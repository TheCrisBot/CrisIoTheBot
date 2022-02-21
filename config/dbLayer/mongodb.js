// const bcrypt = require('bcrypt-nodejs');
const config = require("../");
const mongoose = require("mongoose");

var opts = {
	useMongoClient: true,
	// auto_reconnect: true,
	// poolSize: 10,
	// server: { sockeOptions: { keepAlive: 1 } },
	// db: {
	// 	numberOfRetries: 1000,
	// 	retryMiliSeconds: 1000
	// }
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
};

module.exports = function() {
	mongoose.Promise = global.Promise;
	// mongoose.set('useNewUrlParser', true);
	// mongoose.set('useFindAndModify', false);
	// mongoose.set('useCreateIndex', true);
	// mongoose.set('useUnifiedTopology', true);

	// Creating an instance for MongoDB
	mongoose.connect(config.mongo.uri, opts);
	mongoose.connection.on("connected", function(){
		console.log("Connected: Successfully connect to mongo server");
	});
	mongoose.connection.on('error', function(){
		console.log("Error: Could not connect to MongoDB. Did you forget to run 'mongod'?");
	});
};
