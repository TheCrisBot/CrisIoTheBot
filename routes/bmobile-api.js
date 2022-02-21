"use strict";
let request = require('request');

/**
 * Bmobile-Vodafone API
 * @param api
 * @returns {*}
 */
module.exports = function(api) {
	/**
	 * GET /bmobile
	 */
	api.get('/bmobile', function(req, res, next) {
		res.send('Bmobile-Vodafone\'s public API available');
	});
	return api;
};