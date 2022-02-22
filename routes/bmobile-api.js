const router = require('express').Router();
let request = require('request');

/**
 * Bmobile-Vodafone API
 * @param api
 * @returns {*}
 */
/**
 * GET /bmobile
 */
router.get('/bmobile', function(req, res, next) {
	res.send('Bmobile-Vodafone\'s public API available');
});

module.exports = router;