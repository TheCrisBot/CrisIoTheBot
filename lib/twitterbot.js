var Twit = require('twit');

var CrisIoTwitterBot = module.exports = function(config) {
	this.initialized = false;
	if (/*!(this instanceof CrisIoTwitterBot)*/ !this.initialized) {
		this.initialized = true;
		this.client = new Twit(config);
	}
};

CrisIoTwitterBot.prototype.search = function(query) {
	return this.client.get('search/tweets', { 
		q: 'banana since:2011-07-11', 
		count: 100 
	}, function(err, data, response) {
  		console.log(data);
	});
};

CrisIoTwitterBot.prototype.updateStatus = function(status) {
	this.client.post('statuses/update', {
		status: status
	}, function(err, data, response) {
		console.log(data);
	});
};

CrisIoTwitterBot.prototype.deleteTweet = function(tweetid) {
	this.client.post('destroy/tweet/:id', {
		id: tweetid
	}, function(err, data, response) {
		console.log(data)
	});
};