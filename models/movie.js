// Dependencies
var restful = require('node-restful');
var mongoose = require('mongoose');

// Schema
const movieSchema = new mongoose.Schema({
	user_id: {type: String},
	title: {type: String},
	plot: {type: String},
	date: {type: String},
	runtime: {type: String},
	director: {type: String},
	cast: {type: String},
	rating: {type: String},
	poster_url: {type: String}
});

// Return model
module.exports = restful.model('movie', movieSchema);