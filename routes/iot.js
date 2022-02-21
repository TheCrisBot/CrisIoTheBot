module.exports = function(app) {
	const Database = require('../lib/database');
	const connection = new Database("mysql");
	app.get('/iot/devices', function(req, res, next){

		connection.query('SELECT * FROM devices ORDER BY id', function(error, results, fields) {
			if (error) throw new Error(error);
			res.json(results);
		})
		
		connection.end();
	});

	app.post('/iot/devices', function(req, res, next){

		connection.query('SELECT * FROM devices ORDER BY id', function(error, results, fields) {
			if (error) throw error;
			res.json(results);
		})
		
		connection.end();
	});

	app.get('/iot/devices/:id', function(req, res, next) {
		let { id } = req.params;

	// headers: {
	// 	host: 'localhost:3000',
	// 	'user-agent': 'curl/7.47.1',
	// 	accept: '*/*',
	// 	'content-length': '27',
	// 	'content-type': 'application/x-www-form-urlencoded' 
	// }

		connection.query('SELECT * FROM devices WHERE id=?', [id], function(error, results, fields) {
			if (error) console.log(error);
			res.send(results);
		})
		
		connection.end();
	});

	app.post('/iot/devices/:id', function(req, res, next) {
		let { params, body, query } = req;
		let { id } = params;

		console.log(body)

	// headers: {
	// 	host: 'localhost:3000',
	// 	'user-agent': 'curl/7.47.1',
	// 	accept: '*/*',
	// 	'content-length': '27',
	// 	'content-type': 'application/x-www-form-urlencoded' 
	// }

		connection.query('SELECT * FROM devices WHERE id=?', [id], function(error, results, fields) {
			if (error) console.log(error);
			res.send(results);
		})
		
		connection.end();
	});

	return app;
};