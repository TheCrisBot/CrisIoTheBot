var connectToTwitter = require('../lib/twitterbot');
// get the app to connect to twitter.
var tweetbot = new connectToTwitter({
	consumer_key: 			process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: 		process.env.TWITTER_CONSUMER_SECRET,
	access_token: 			process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: 	process.env.TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms:				60 * 1000,  // optional HTTP request timeout to apply to all requests.
	strictSSL: 				true,     // optional - requires SSL certificates to be valid.
});

console.log("CrisIoTwitterBot Running.")

module.exports = function(router) {
	router.get("/twitter/tweets", function (req, res) {
		console.log(tweetbot)
	});
	router.get("/twitter/intent/search", function (req, res) {
		tweetbot.search('hello');
	});
	router.get("/twitter/intent/post", function (req, res) {
		tweetbot.search('hello');
	});
	router.get("/twitter/photos", function (req, res) {
		tweetbot.search('hello');
	});
	router.get("/twitter/videos", function (req, res) {
		tweetbot.search('hello');
	});
	router.get("/twitter/followers", function (req, res) {
		tweetbot.search('hello');
	});
	router.get("/twitter/profile", function (req, res) {
		tweetbot.client.get('hello', function(err, res){
			if (err) return new Error(err);
			res.json(res);
		});
	});
};