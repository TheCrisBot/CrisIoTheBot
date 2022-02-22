var Twit = require('twit');

var CrisIoTwitterBot = module.exports = function(config) {
	this.initialized = false;
	if (/*!(this instanceof CrisIoTwitterBot)*/ !this.initialized) {
		this.initialized = true;
		this.client = new Twit(config);
	}

	this.client.get('account/verify_credentials', {
		include_entities: false,
		skip_status: true,
		include_email: false
	}, onAuthenticated)

	function onAuthenticated(err, res) {
		if (err) {
			throw err
		}

		console.log('Authentication successful. Running bot...\r\n')
	}


    const stream = this.client.stream('user');
    stream.on('follow', onFollowed);
    stream.on('error', onError);
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

function onFollowed(event) {
    const name = event.source.name
    const screenName = event.source.screen_name
    const response = '@' + screenName + ' Thank you for following, ' + name + '!'

    // tweet response to user here
    this.client.post('statuses/update', {
	    status: response
	}, onTweeted);

    console.log('I was followed by: ' + name + ' @' + screenName)
}

function onError(error) {
    throw error
}

function onTweeted(err, reply) {
    if (err !== undefined) {
        console.log(err)
    } else {
        console.log('Tweeted: ' + reply.text)
    }
}