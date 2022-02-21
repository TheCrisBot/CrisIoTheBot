var request = require('request-promise');

/**
 * Weather API
 * Retrieve weather reports from weather site
 * @param router
 * @returns {*}
 */
module.exports = function(router) {
	const OPENWEATHER_API_URL = "http://api.openweathermap.org/data/2.5/forecast";
	const OPENWEATHER_API_KEY = "aaae70631b041cdaaf70b087267af46f";
	// http://api.openweathermap.org/data/2.5/forecast?id=2091996&appid=aaae70631b041cdaaf70b087267af46f
	// http://api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}
	// https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1
	// http://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}
	// http://api.openweathermap.org/data/2.5/forecast/daily?q={city name},{country code}&cnt={cnt}
	// https://samples.openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&id=2091996&units=metric

	/**
	 * GET /api/weather?locationId=12&location=Madang&coords=[-9.4461952,147.1823872]
	 */
	router.get('/weather', function(req, res) {
		// const { locationId, location, coords } = req.query;

		var options = {
			method: 'POST',
			body: {
				id: 2091996,
				// lat: coords[0],
				// lon: coords[1],
				cnt: 7,
				appid: OPENWEATHER_API_KEY
			},
			json: true,
			url: OPENWEATHER_API_URL
		};
		
		// send request to open weather api for the current day weather forecast
		request(options, function(err, response, body) {
			if (err) {
				console.error('error posting json: ', err);
				// res.sendStatus(500);
			}
			var headers = res.headers
			var statusCode = res.statusCode
			// console.log('headers: ', headers)
			// console.log('statusCode: ', statusCode)
			// console.log('body: ', body)
			res.set("x-crisbot-clientdate", new Date().toISOString());
			res.get("x-crisbot-clientid", "1c794eee-3274-4792-be90-62e41dbee183");
			res.send(JSON.parse(body));
		});
	});

	/**
	 * GET /api/weather/forecast?locationId=1&coords=[-5.22, 145.8]
	 */
	router.get('/weather/forecast', function(req, res) {
		const { locationId, coords } = req.query;

		var data = {
			id: locationId,
			lat: coords[0],
			lon: coords[1],
			cnt: 5,
			appid: OPENWEATHER_API_KEY
		};

		// send request to open weather api for 5 days forecast, current day in the middle
		request({
			url: OPENWEATHER_API_URL + "/daily",
			method: 'POST',
			body: data,
			json: true
		}).then(function(response){
			res.set("x-crisbot-clientdate", new Date().toISOString());
			res.get("x-crisbot-clientid", "1c794eee-3274-4792-be90-62e41dbee183");
			res.json(response);
		}).catch(function(error){
			res.send(error);
		})
	});

	return router;
};