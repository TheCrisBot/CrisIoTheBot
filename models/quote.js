
// Dependencies
var restful = require('node-restful');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var quoteSchema = new Schema({
    body: String,
    source: String
});

// Return model
module.exports = restful.model('quote', quoteSchema);