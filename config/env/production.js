// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object
module.exports = {
	// MongoDB connection options
	mongo: {
		uri: 'mongodb://chrisaugu:chatm3@ds061757.mongolab.com:61757/crisbotdb',
		db:  process.env.MONGODB_URI
	},
	mqtt: {
		host: process.env.EMQTT_HOST || '127.0.0.1',
		clientId: 'API_Server_Dev',
		port: 8883
	}
};