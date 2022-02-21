// Dependencies
var restful = require('node-restful');
var mongoose = require('mongoose');

// Schema
const trackerSchema = new mongoose.Schema({
	number: String,
	imei: Number,
	imei2: Number,
	email: String,
	coords: {type: [Number], index: '2d'},
	date_created: {type: Date, dedfaul: Date.now}
});

// Return model
module.exports = restful.model('phonetracker', trackerSchema);