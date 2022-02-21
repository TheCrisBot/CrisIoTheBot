let mysql = require('mysql');
// let hl = require('handy-log');
let { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let connection = mysql.createConnection({
	host: MYSQL_HOST,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
	charset: 'utf8mb4'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    // hl.error(err.message);
    return;
  }

  // console.log('connected as id ' + connection.threadId);
});

// connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
// 	if (error) throw error;
// 	console.log("The solution is: ", results[0].solution);
// })

// connection.end();

module.exports = connection;