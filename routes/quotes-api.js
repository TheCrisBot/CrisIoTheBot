const restful = require('node-restful');
const router = require('express').Router();

// importing models
let Quote = restful.model('quote');

// registering endpoints
Quote.methods(['get', 'put', 'post', 'delete']);
Quote.register(router, '/quotes');

module.exports = router;