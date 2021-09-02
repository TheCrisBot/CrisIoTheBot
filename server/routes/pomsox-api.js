let request = require('request');
let extend = require('extend');

module.exports = function(api) {
	// http://www.pomsox.com.pg/wp-content/uploads/wp-responsive-images-thumbnail-slider/BSP_150_150.png
	// fetch("http://www.pomsox.com.pg/data/BSP.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	let listedComs = ['BSP','CCP','CGA','COY','CPL','HIG','KAM','KPL','KSL','NCM','NGP','NIU','OSH','SST','BSPHA'];
	
	/**
	 * GET /pomsox
	 * retrieve POMSOX data
	 * param: /pomsox, retrieve quotes from all the companies for the current day
	 * param: /pomsox?code=CODE, retreive quotes from a specific company for the current day
	 * param: /pomsox?code=CODE&date=now, retreive quotes from a specific company for the specific day
	 */
	api.get('/pomsox', function(req, res) {
		var code = req.query.code;
		var date = new Date(req.query.date);

		// `${date.getFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;

		var i = [];
		var options = {};
		var url = "http://www.pngx.com.pg/data/";
		// var url = "http://localhost/christianaugustyn/ajax/";
		Object.assign(options, {
			"method": 'GET',
			'json': true,
			// 'body': {
			// 	'username': req.body.username,
			// 	'password': req.body.password
			// }
		});

		if (undefined !== typeof code) {
			options['url'] = url + code +".csv";
			getData(options).then(function(response){
				res.json(response)
			});
		} else {
			for (var j = 0; j < listedComs.length; j++) {

				options['url'] = url + listedComs[j] +".csv";

				getData(options).then(function(response){
					res.json(response)
				});
			}
		}
	});

	function parseCSV(body) {
		var i = [];
		// split the data into array by whitespaces
		// var o = body.split(/\r\n|\n/);

		// split the first row of that array only by comma (,) to get headers
		// var a = o[0].split(",");

		// loop through the other rows to obtain data
		for (var o = body.split(/\r\n|\n/), a = o[0].split(","), s = 1; s < o.length; s++) {
			// split each row by comma
			var l = o[s].split(",")
			// compare the splited row with the first/header row 
			if (l.length == a.length) {
				// run through the header row
				// attaches splited row to the header row
				// then store it on variable d
				// create array by pushing the stored data to the variable i
				for(var d = {}, u = 0; u < a.length; u++) d[a[u]] = l[u]; i.push(d)
			}
		}
		// i[i.length -1]
		return i;
	}

	function getData(options) {
		return new Promise(function(resolve, reject) {
			request(options, function(error, response, body) {
				if (error) reject(error);
				if (response && response.statusCode == 200) {
					resolve(parseCSV(body));
				}
			});
		});
	}

	return api;
};