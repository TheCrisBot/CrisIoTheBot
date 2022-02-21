#!/usr/bin/env node

const http = require('http');
// const ip = require('ip');
// const os = require('os');
require("dotenv").config();

let app = require('./app');

// const interfaces = os.networkInterfaces();
// const getNetworkAddress = () => {
// 	for (const name of Object.keys(interfaces)) {
// 		for (const interface of interfaces[name]) {
// 			const {address, family, internal} = interface;
// 			if (family === 'IPv4' && !internal) {
// 				return address;
// 			}
// 		}
// 	}
// };

let server = http.createServer(app);

// create server and listen on the port
server.listen(app.get('port'), "localhost", function(req, res) {
	const details = server.address();
	// let localAddress = null;
	// let networkAddress = null;

	// if (typeof details === 'string') {
	// 	localAddress = details;
	// } else if (typeof details === 'object' && details.port) {
	// 	const address = details.address === '::' ? 'localhost' : details.address;
	// 	const ip = getNetworkAddress();
	// 	// const ip = ip.address();

	// 	localAddress = `http://${address}:${details.port}`;
	// 	networkAddress = `http://${ip}:${details.port}`;
	// }

	// let log = "\n--------------------------------------------------\n";

	// if (localAddress) {
	// 	log += `Server running on port ${localAddress}\n`;
	// }
	// if (networkAddress) {
	// 	log += `Server running on port ${networkAddress}`;
	// }

	// log += "\n--------------------------------------------------\n";

	// console.log(log);

	console.log(`Server running on port ${details.port}`)
});

