// var restful = require('node-restful');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function convertDate(e) {
    return e;
}

var quoteSchema = new Schema({
    date: {type: Date, default: Date.now, index: true, get: convertDate},  
    code: String,
    short_name: String,
    bid: Number,
    offer: Number,
    last: Number,
    close: Number,
    high: Number,
    low: Number,
    open: Number,
    chg_today: Number,
    vol_today: Number,
    num_trades: Number
});

var companySchema = new Schema({
    name: String,
    description: String,
    code: String,
    img: String,
    dateListed: Date
});

// let tickerSchema = new Schema({
//     symbol: String,
//     historical: [quoteSchema]
// })

module.exports = mongoose.model('stockquote', quoteSchema);