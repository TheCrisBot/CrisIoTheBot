// let SSL_KEY = __dirname + './key.pem';
// let SSL_CERT = __dirname + './certificate.pem';
// let MONGOURL = 'mongodb://admin:admin123@ds241055.mlab.com:41055/iotfwjs';

// module.exports = {
// 	id: 'broker',
// 	stats: false,
// 	port: 8443,
// 	logger: {
// 		name: 'iotfwjs',
// 		level: 'debug'
// 	},
// 	secure: {
// 		keyPath: SSL_KEY,
// 		certPath: SSL_CERT,
// 	},
// 	backend: {
// 		type: 'mongodb',
// 		url: MONGOURL
// 	},
// 	persistence: {
// 		factory: 'mongo',
// 		url: MONGOURL
// 	}
// };

// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.
const { NlpManager } = require("node-nlp");
console.log("Starting Chatbot ...");
// Creating new Instance of NlpManager class.
const manager = new NlpManager({ languages: ["en"] });
// Loading our saved model
manager.load();
// Loading a module readline, this will be able to take input from the terminal.
var readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);
console.log("Chatbot started!");
rl.setPrompt("> ");
rl.prompt();
rl.on("line", async function (line) {
    // Here Passing our input text to the manager to get response and display response answer.
    const response = await manager.process("en", line);
    console.log(response.answer);
    rl.prompt();
}).on("close", function () {
    process.exit(0);
});