const restful = require('node-restful');
const router = require('express').Router();

// importing models
let Movie = restful.model('movie');

// registering endpoints
Movie.methods(['get', 'post', 'put', 'delete']);
Movie.register(router, '/movies');

module.exports = router;