const http = require('http');
function startUp(port) {
	function onRequest(request, response) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end("It's the information age!");
	}
	http.createServer(onRequest).listen(port);
}

module.exports = startUp;