'use strict';
require("dotenv").config();

// Set the 'development' environment configuration object
module.exports = {
	// MongoDB connection options
	mongo: {
		uri: 'mongodb://localhost:27017/crisbotdb'
	},
	session: {
		cookieSecret: "this-is-my-secret"
	},
	mqtt: {
		host: process.env.EMQTT_HOST || '127.0.0.1',
		clientId: 'API_Server_Dev',
		port: 8883
	},
	fb: {
		FB_APP_SECRET: process.env.FB_APP_SECRET
	}
};
