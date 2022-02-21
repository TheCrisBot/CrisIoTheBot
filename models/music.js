const restful = require('node-restful');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Attaching schema to model
const musicSchema = new Schema({
	user_id: {type: String},
	title: {type: String},
	artist: {type: String},
	album: {type: String},
	date_released: {type: String},
	duration: {type: String},
	poster_url: {type: String}
});

// Return model
module.exports = restful.model("music", musicSchema);