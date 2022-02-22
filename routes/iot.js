const router = require('express').Router();
const Database = require('../lib/database');
const connection = new Database("mysql");

router.get('/', function(req, res) {
	res.send("hello");
});

router.get('/devices', function(req, res, next){

	connection.query('SELECT * FROM devices ORDER BY id', function(error, results, fields) {
		if (error) throw new Error(error);
		res.json(results);
	})
	
	connection.end();
});

router.post('/devices', function(req, res, next){

	connection.query('SELECT * FROM devices ORDER BY id', function(error, results, fields) {
		if (error) throw error;
		res.json(results);
	})
	
	connection.end();
});

router.get('/devices/:id', function(req, res, next) {
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

router.post('/devices/:id', function(req, res, next) {
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

module.exports = router;