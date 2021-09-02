#!/usr/bin/env node

const http = require('http');
// const ip = require('ip');
require("dotenv").config();

// var db = require("./lib/database");
// var tunnel = require("./lib/tunnel");
let app = require('./app');

// Creating an instance for Database
// new db(app);

// create server and listen on the port
http.createServer(app).listen(app.get('port'), "localhost"/*ip.address()*/, function() {
	console.log(`API running on http://${ this.address().address }:${ this.address().port }`);
});