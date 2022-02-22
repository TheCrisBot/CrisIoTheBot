/**
 * @api public
 * importing api modules and registering endpoints
 */
const restful = require('node-restful');
const request = require('request-promise');
const path = require('path');
const router = require('express').Router();

// importing models
let Quote = restful.model('quote');

// registering endpoints
Quote.methods(['get', 'put', 'post', 'delete']);
Quote.register(router, '/quotes');

// importing api modules
require('./webhook')(router);
require("./digicel-api")(router);
require("./telikom-api")(router);
require("./bmobile-api")(router);
require('./pngx-api')(router);
require('./oauth')(router);
require("./facebook-api")(router);
require('./instagram-api')(router);
// require('./twitter-api')(router);
require('./weather-api')(router);
// require('./imdb-api')(router);
// require('./google-api')(router);
// require('./translate-api')(router);
// require('./maps-api')(router);
// require('./sports-api')(router);
// require('./spotify-api')(router);
// require('./soundcloud-api')(router);
// require('./radio-api')(router);
require('./mail-api')(router);
// require('./iot')(router);
require('./sms-api')(router);


module.exports = router;