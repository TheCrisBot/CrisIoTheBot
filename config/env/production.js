// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object
module.exports = {
	// MongoDB connection options
	mongo: {
		uri: process.env.MONGODB_ADDON_URI
	},
	mqtt: {
		host: process.env.EMQTT_HOST || '127.0.0.1',
		clientId: 'API_Server_Dev',
		port: 8883
	}
};