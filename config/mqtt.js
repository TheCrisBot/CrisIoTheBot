var mqtt = require('mqtt');
var config = require('./config');

var client = mqtt.connect({
	port: config.mqtt.port,
	protocol: 'mqtts',
	host: config.mqtt.host,
	clientId: config.mqtt.clientId,
	reconnectPeriod: 1000,
	username: config.mqtt.clientId,
	password: config.mqtt.clientId,
	keepalive: 300,
	rejectUnauthorized: false
});

client.on('connect', function() {
	client.subscribe('api-engine');
});

client.on('message', function(topic, message) {
	// message is Buffer
	// console.log('Topic >> ', topic);
	// console.log('Message >> ', message.toString());
	if (topic === 'api-engine') {
		var macAddress = message.toString();
		console.log('Mac Address >> ', macAddress);
		client.publish('rpi', 'Got Mac Address: ' + macAddress);
	} else {
		console.log('Unknown topic', topic);
	}
});

module.exports = client;