const router = require('express').Router();

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

router.get("/", function(req, res) {
	res.send("Hello")
})

router.get("/tweets", function (req, res) {
	console.log(tweetbot)
});

router.get("/intent/search", function (req, res) {
	tweetbot.search('hello');
});

router.get("/intent/post", function (req, res) {
	tweetbot.search('hello');
});

router.get("/photos", function (req, res) {
	tweetbot.search('hello');
});

router.get("/videos", function (req, res) {
	tweetbot.search('hello');
});

router.get("/followers", function (req, res) {
	tweetbot.search('hello');
});

router.get("/profile", function (req, res) {
	tweetbot.client.get('hello', function(err, res){
		if (err) return new Error(err);
		res.json(res);
	});
});

tweetbot.client.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})

tweetbot.client.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data)
})
tweetbot.client.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, data, response) {
  console.log(data)
})

module.exports = router;