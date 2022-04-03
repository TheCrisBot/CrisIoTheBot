const router = require('express').Router();
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookStrategy = require('passport-facebook').Strategy;
const request = require('request-promise');

let middlewares, { isLoggedIn } = require('../lib/middlewares');
// const keys = require('../config');

// you'll need to have requested 'user_about_me' permissions
// in order to get 'quotes' and 'about' fields from search
const userFieldSet = 'id, name, about, email, link, is_verified, significant_other, relationship_status, picture, user_relationships, user_about_me, user_location, user_website, user_photos, user_posts, website, accounts, picture, photos, feed';
const pageFieldSet = 'name, category, link, picture, is_verified';
const searchType = ["user", "page", "event", "group", "place", "placetopic"];
const queryType = ["post", "video"];

router.get('/', function(req, res){
	res.json("working");
	// res.json({
	// 	"error": {
	// 		"message": "Unsupported get request. Please read the Graph API documentation at https://developers.facebook.com/docs/graph-api",
	// 		"type": "GraphMethodException",
	// 		"code": 100,
	// 		"error_subcode": 33,
	// 		"fbtrace_id": "E0Ido0iFKsI"
	// 	}
	// });
	// https://www.bingapis.com/api/v6/images/search
	// wss://*.facebook.com:* wss://*.web.whatsrouter.com wss://web.whatsrouter.com
});

router.get('/posts', function(req, res) {
	var typeOfPosts = req.query.type;
	var limit = req.query.limit;

	var options = {
		method: "GET",
		uri: `https://graph.facebook.com/v3.1/${userId}`,
		qs: {
			access_token: keys.facebook.pageAccessToken,
			type: queryType[0],
			fields: ''
		}
	}

	if (typeOfPosts === "photos") {
		options['qs']['fields'] = "photos.limit(2).order(reverse_chronological){link, comments.limit(2).order(reverse_chronological)}";
	}
	if (typeOfPosts === "videos") {
		options['qs']['type'] = queryType[1];
		options['qs']['fields'] = "photos.limit(2).order(reverse_chronological){link, comments.limit(2).order(reverse_chronological)}";
	}
	if (typeOfPosts === "posts") {
		options['qs']['fields'] = "photos.limit(2).order(reverse_chronological){link, comments.limit(2).order(reverse_chronological)}";
	}

	return request(options).then((response)=>{
		res.json(response);
	})
});

router.get('/friendslist', function(req, res) {
	var prof_id = 100004177278169;
	// make a request to https://mobile.facebook.com/
	// $("[name=target]").value
	// returns user id

	function getids(a, b, c) {
		var d = a.length;
		if (0 == d) return [];
		var f, e = 0,
			g = [];
		for (c || (b = b.toLowerCase(), a = a.toLowerCase());
			 (f = b.indexOf(a, e)) > -1;) g.push(f), e = f + d;
		return g
	}
	getFriendsList()

	//gets an array of ids of all active users in friends list.
	function getFriendsList() {
		for (let indx = 0; true; indx++) {

			// console.log(ids);
			var counter = 0;
			var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
			var a = new XMLHttpRequest();
			a.open("GET", "https://www.facebook.com/ajax/browser/list/allfriends/?uid=" + prof_id + "&location=friends_tab_tl&__a=1&__dyn=&__req=&start=" + indx, !1), a.send(null);
			var responseTxt = a.responseText;
			var ids = getids("data-profileid", responseTxt);
			if (ids.length < 2) {
				break;
			}
			//shortens list to make testing easier
			// if ( indx > 100 ) {
			//	console.log("shuttin' dwwosdafwn")
			//	break;
			// }
			for (let k = 0; k < ids.length; k += 2) {
				var l = responseTxt.substring(ids[k] + 17),
					m = l.indexOf('"');
				let newfrid = responseTxt.substring(ids[k] + 17, ids[k] + 16 + m);
				if (!friends.includes(newfrid)) {
					friends.push(newfrid);
				}
				counter = friends.length;
				console.log(counter);
			}
		}
	}
});

router.post('/search', (req, res) => {
	const { queryTerm, searchType } = req.body;

	const options = {
		method: 'GET',
		uri: 'https://graph.facebook.com/search',
		qs: {
			access_token: config.user_access_token,
			q: queryTerm,
			type: searchType[1],
			fields: searchType === 'page' ? pageFieldSet : userFieldSet
		}
	};

	request(options).then(fbRes => {
		// Search results are in the data property of the response.
		// There is another property that allows for pagination of results.
		// Pagination will not be covered in this post,
		// so we only need the data property of the parsed response.
		const parsedRes = JSON.parse(fbRes).data;
		res.json(parsedRes);
	})
})

router.post('/upload', function(req, res, next) {
	var typeOfUpload = req.query.type;

	const id = 'page or user id goes here';
	const access_token = 'for page if posting to a page, for user if posting to a user\'s feed';

	var options = {
		method: "POST",
		uri: "",
		qs: {
			access_token: keys.facebook.pageAccessToken,
		}
	};

	if (typeOfUpload === "video") {
		options['uri'] = `https://graph.facebook.com/v2.8/${id}/videos`;
		options['qs']['description'] = 'Caption goes here';
		options['qs']['file_url'] = 'Video url goes here';
		options['qs']['no_story'] = false;
	}
	if (typeOfUpload == "photo") {
		options['uri'] = `https://graph.facebook.com/v2.8/${id}/photos`;
		options['qs']['caption'] = 'Caption goes here';
		options['qs']['url'] = 'Image url goes here';
	}
	if (typeOfUpload == "text") {
		options['uri'] = `https://graph.facebook.com/v2.8/${id}/feed`;
		options['qs']['message'] = 'Message goes here';
		options['qs']['no_story'] = false;
	}


	return request(options).then(function(fbRes){
		res.json(fbRes);
	});
});

router.route('/message')
	.get(function(req, res){
		return request({
			"uri": "https://graph.facebook.com/v2.12/me/messages",
			"qs": {
				"access_token": process.env.USER_ACCESS_TOKEN,
				"limit": 5
			},
			"method": "POST",
			"json": true
		}, function(error, response, body) {
			if (!error) {
				console.log('message sent');
			} else if (error) {
				console.log("Error sending message: " + response.error);
			} else {
				console.error("Unable to send message: " + error);
			}
		});
	})
	.post(function(req, res){
		const recipientId = req.body.recipient;
		const message = req.body.message;

		let request_body = {
			"recipient": {
				"id": recipientId
			},
			"message": response
		}

		// Send the HTTPS request to the Messenger Platform
		return request({
			"uri": "https://graph.facebook.com/v2.12/me/messages",
			"qs": {
				"access_token": process.env.USER_ACCESS_TOKEN
			},
			"method": "POST",
			"json": request_body
		}, function(error, response, body) {
			if (!error) {
				console.log('message sent');
			} else if (error) {
				console.log("Error sending message: " + response.error);
			} else {
				console.error("Unable to send message: " + error);
			}
		});
	});

function getUserProfilePicture(userId) {
	return `https://graph.facebook.com/${userId}/picture?type=large`;
}

// route for login form
// route for processing the login form
// route for signup form
// route for processing the signup form

// route for showing the profile page
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile', {
		user : req.user // get the user out of session and pass to template
	});
});

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth', passport.authenticate('facebook', {
	scope : ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
router.get('/auth/callback',
	passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect : '/connect'
	}));

// route for logging out
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/webhook', function(req, res) {
	if (req.query['hub.verify_token'] === process.env.FACEBOOK_VERIFICATION_TOKEN){
		console.log('webhook verified');
		res.status(200).send(req.query['hub.challenge']);
	}
	else {
		console.error('verification failed. Token mismatch.');
		res.sendStatus(403);
	}
});

router.post('/webhook', function(req, res) {
	//checking for page subscription.
	if (req.body.object === 'page'){

		/* Iterate over each entry, there can be multiple entries
        if callbacks are batched. */
		req.body.entry.forEach(function(entry) {
			// Iterate over each messaging event
			entry.messaging.forEach(function(event) {
				console.log(event);
				if (event.postback){
					processPostback(event);
				} else if (event.message){
					processMessage(event);
				}
			});
		});

		res.sendStatus(200);
	}
});

function senderAction(recipientId){
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
		method: "POST",
		json: {
			recipient: {id: recipientId},
			sender_action: "typing_on"
		}
	}, function(error, response, body) {
		if (error) {
			console.log("Error sending message: " + response.error);
		}
	});
}

function sendMessage(recipientId, message){
	return new Promise(function(resolve, reject) {
		request({
			url: "https://graph.facebook.com/v2.6/me/messages",
			qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
			method: "POST",
			json: {
				recipient: {id: recipientId},
				message: message,
			}
		}, function(error, response, body) {
			if (error) {
				console.log("Error sending message: " + response.error);
				reject(response.error);
			} else {
				resolve(body);
			}
		});
	})
}

function processPostback(event) {
	const senderID = event.sender.id;
	const payload = event.postback.payload;
	if (payload === 'WELCOME') {
		request({ url: "https://graph.facebook.com/v2.6/" + senderID,
			qs: { access_token: process.env.PAGE_ACCESS_TOKEN,
				fields: "first_name"
			},
			method: "GET"
		}, function(error, response, body) {
			let greeting = '';
			if (error) {
				console.error("Error getting user name: " + error);
			} else {
				let bodyObject = JSON.parse(body);
				console.log(bodyObject);
				name = bodyObject.first_name;
				greeting = "Hello " + name  + ". ";
			}
			let message = greeting + "Welcome to Healthbot. Hope you are       doing good today";
			let message2 = "I am your nutrition tracker :-)"
			let message3 = "please type in what you ate like: I ate chicken birayani and 2 chapatis with dal.";
			senderAction(senderID);
			sendMessage(senderID, {text: message}).then(() => {
				sendMessage(senderID, { text: message2 }).then(() => {
					sendMessage(senderID, {  text: message3}).then(() => {
						sendMessage(senderID, { text: '🎈' });
					})
				});
			});
		});
	}
}

function processMessage(event) {
	if (!event.message.is_echo) {
		const message = event.message;
		const senderID = event.sender.id;
		console.log("Received message from senderId: " + senderID);
		console.log("Message is: " + JSON.stringify(message));
		if (message.text) {
			// now we will take the text received and send it to an food tracking API.
			let text = message.text;
			let request = require("request");
			let options = {
				method: 'POST',
				url: 'https://mefit-preprod.herokuapp.com/api/getnutritionvalue',
				headers:{ 'cache-control': 'no-cache',
					'content-type': 'application/json'
				},
				body:{ userID: process.env.USERID,
					searchTerm: text
				},
				json: true
			};
			request(options, function (error, response, body) {
				if (error) throw new Error(error);
				senderAction(senderID);
				// after the response is recieved we will send the details in a Generic template
				sendGenericTemplate(senderID, body);
			});
		}
	}
}

function sendGenericTemplate(recipientId, respBody) {
	console.log(respBody);
	const nutritionalValue = [];
	for (let i = 0; i < respBody.length; i++) { // I dont like using forEach
		let obj = {
			"title":respBody[i].food_name,
			"image_url": respBody[i].thumbnail,
			"subtitle": 'Total Calories: ' +     respBody[i].total_calories + "\n" + 'protein: ' + respBody[i].protein + "\n" + 'Carbohydrates: ' + respBody[i].total_carbohydrate,
		}
		nutritionalValue.push(obj);
	}
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": nutritionalValue
			}
		}
	}

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: {id: recipientId},
			message: messageData,
		}
	}, function(error, response, body){
		if (error) {
			console.log("Error sending message: " + response.error)
		}
	})
}


module.exports = router;