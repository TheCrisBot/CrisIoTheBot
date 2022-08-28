const router = require('express').Router();
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookStrategy = require('passport-facebook').Strategy;
const request = require('request-promise');
// const apiAiClient = require('apiai')(process.env.API_AI_TOKEN);

let middlewares, { isLoggedIn } = require('../lib/middlewares');
// const keys = require('../config');

// you'll need to have requested 'user_about_me' permissions
// in order to get 'quotes' and 'about' fields from search
const userFieldSet = 'id, name, about, email, link, is_verified, significant_other, relationship_status, picture, user_relationships, user_about_me, user_location, user_website, user_photos, user_posts, website, accounts, picture, photos, feed';
const pageFieldSet = 'name, category, link, picture, is_verified';
const searchType = ["user", "page", "event", "group", "place", "placetopic"];
const queryType = ["post", "video"];

const images = {
    cats: [
        'https://i.imgur.com/Qbg7CeM.jpg',
        'https://i.imgur.com/nUzkpJY.jpg',
        'https://i.imgur.com/NpDcKph.jpg',
        'https://i.imgur.com/oJtSDaO.jpg',
        'https://i.redd.it/82ajpsrd17111.jpg',
        'https://i.redd.it/00km1d2rt0111.jpg',
        'https://i.redd.it/rdbavhp0y7111.jpg',
        'https://i.redd.it/5hn3mg0n98111.jpg',
        'https://i.redd.it/d23pb8mta6111.jpg',
        'https://i.redd.it/d2gyrwgy7oz01.jpg',
        'https://i.redd.it/z4sgl84q72z01.jpg',
        'https://i.redd.it/wvykzo8n1cy01.jpg'
    ],
    dogs: [
        'https://i.redd.it/6tjihi2qe7111.jpg',
        'https://i.imgur.com/etRCs56.jpg',
        'https://i.redd.it/nibw50f8y4111.jpg',
        'https://i.redd.it/izcvnvj1o7111.jpg',
        'https://i.redd.it/eqs1g9dldz011.jpg',
        'https://i.redd.it/civ9dnu9u1111.jpg',
        'https://i.redd.it/kk03qwclkp011.jpg',
        'https://i.redd.it/2694pupjne011.jpg',
        'https://i.redd.it/qk49ls5y6oy01.jpg',
        'https://i.imgur.com/oM3mKgB.jpg',
        'https://i.redd.it/8kx2riaulux01.jpg'
    ]
};


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
	if (typeOfUpload === "photo") {
		options['uri'] = `https://graph.facebook.com/v2.8/${id}/photos`;
		options['qs']['caption'] = 'Caption goes here';
		options['qs']['url'] = 'Image url goes here';
	}
	if (typeOfUpload === "text") {
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
/**
 * Facebook Endpoints
 * @Router /api/v1/auth/facebook
 * Request will be redirected to Facebook
 */
router.get('/auth', passport.authenticate('facebook', {
	// scope : ['public_profile', 'email']
	authType: 'rerequest',
	scope: ['public_profile', 'id', 'name', 'age', 'age_range', 'gender', 'profile_pic', 'picture', 'user_photos', 'user_friends', 'friends']
}));

// handle the callback after facebook has authenticated the user
// router.get('/auth/callback', passport.authenticate('facebook', {
// 	successRedirect : '/',
// 	failureRedirect : '/connect'
// }));
router.get('/auth/callback', passport.authenticate('facebook', {
	successRedirect : '/',
	failureRedirect : '/connect'
}), function(req, res) {
	// Successful authentication, redirect home
	res.json(req.user);
	// res.redirect('/');
});

// route for logging out
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

/**
 * GET /webhook
 * Facebook Webhook Endpoints
 * Used for messenger verification
 */
router.get('/webhook', function(req, res) {
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token is in the query string of the request
	if (req.query['hub.verify_token'] === process.env.FACEBOOK_VERIFICATION_TOKEN){
		console.log('webhook verified');
		res.status(200).send(req.query['hub.challenge']);
	}
	else {
		console.error('verification failed. Token mismatch.');
		res.sendStatus(403);
	}

    if (mode && token) {

        // Check the mode and token sent
        if ((mode === 'subscribe' && token === process.env.VERIFICATION_TOKEN)) {
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            console.error("Verification failed. The tokens do not match.");
            res.sendStatus(403);
        }
    }
});

// {
//   "field": "messages",
//   "value": {
//     "sender": {
//       "id": "12334"
//     },
//     "recipient": {
//       "id": "23245"
//     },
//     "timestamp": "1527459824",
//     "message": {
//       "mid": "test_message_id",
//       "text": "test_message"
//     }
//   }
// }


/**
 * POST /webhook
 * Facebook Webhook Endpoints
 * All callbacks for Messenger will be POST-ed here
 */
// Handle Post Request to receive messages.
router.post('/webhook', function(req, res) {
    console.log("Received webhook");
    console.log('Webhook messaging step.')

    let body = req.body;

	//checking for page subscription.
    // Make sure this is a page subscription
	if (body.object === 'page'){
        /* Iterate over each entry, there can be multiple entries
        if callbacks are batched. */
		// Iterate over each entry
        // There may be multiple entries if batched
        body.entry.forEach(function(entry) {
            let pageID = entry.id;
            let timeOfEvent = entry.time;

            // let webhook_event = entry.messaging;
            // console.log(webhook_event);

            // Get the sender PSID
            // let sender_psid = webhook_event.sender.id;
            // console.log('Sender PSID: ' + sender_psid);

            // Iterate over each messaging event
            entry.messaging.forEach(function(event) {
                if (event.postback) {
                    processPostback(event);
                } else if (event.message) {
                    processMessage(event);
        //     getMessage(message_obj);
        //     sendMessage(message_obj.sender.id,"Greeting from Aitude!")
                } else if (event.game_play) {
                    receivedGameplay(event);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });

        // Returns a '200 OK' response to all requests
        res.sendStatus(200);
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
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

function sendGenericTemplate(recipientId, respBody) {
	console.log(respBody);
	const nutritionalValue = [];
	for (let i = 0; i < respBody.length; i++) { // I dont like using forEach
		let obj = {
			"title": respBody[i].food_name,
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

// route for login form
// route for processing the login form
// route for signup form
// route for processing the signup form

/**
 * Postback
 */
function processPostback(event) {
	// const senderId = event.sender.id;	
    let senderId = event.sender.id;
    // Get the payload for the postback
    let payload = event.postback.payload;
    let response;

	console.log("payload: " + payload);

    // Set the response based on the postback payload
    if (payload === "GET_STARTED") {
        // sendGetStarted(senderId);
        response = askTemplate('Are you a Cat or Dog Person?');
        callSendAPI(senderId, response);

        // Get user's first name from the User Profile API
        // and include it in the greeting
        // request({
        //     url: "https://graph.facebook.com/v2.6/" + senderId,
        //     qs: {
        //         access_token: process.env.PAGE_ACCESS_TOKEN,
        //         fields: "first_name"
        //     },
        //     method: "GET"
        // }, function(error, response, body) {
        //     var greeting = "", name;

        //     if (error) {
        //         console.log("Error getting user's name: " + error);
        //     } else {
        //         var bodyObj = JSON.parse(body);
        //         name = bodyObj.first_name;
        //         greeting = "Hi " + name + ". ";
        //     }
        //     var message = greeting + "I am CrisBot. I am a bot. I can tell you various details regarding movies. What movie would you like to know about?";
        //     sendMessage(senderId, null, message, "", "");
        // });
    } else if (payload === "CORRECT") {
        sendMessage(senderId, null, "Awesome! What would you like to find out? Enter 'plot', 'date', 'runtime', 'director', 'cast' or 'rating' for the various details.", '', '');
    } else if (payload === "INCORRECT") {
        sendMessage(senderId, null, "Oops! Sorry about that. Try using the exact title of the movie", '', '');
    } else if (payload === 'CAT_PICS') {
        response = imageTemplate('cats', senderId);
        callSendAPI(senderId, response, function(){
            callSendAPI(senderId, askTemplate('Show me more'));
        });
    } else if (payload === 'DOG_PICS') {
        response = imageTemplate('dogs', senderId);
        callSendAPI(senderId, response, function() {
            callSendAPI(senderId, askTemplate('Show me more'));
        });
    } else {
        sendTextMessage(senderId, "Postback called");
    }
    // Send the message to acknowledge the postback


	if (payload === 'WELCOME') {
		request({ 
			url: "https://graph.facebook.com/v2.6/" + senderId,
			qs: { 
				access_token: process.env.PAGE_ACCESS_TOKEN,
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
			let message = greeting + "Welcome to Healthbot. Hope you are doing good today";
			let message2 = "I am your nutrition tracker :-)"
			let message3 = "please type in what you ate like: I ate chicken birayani and 2 chapatis with dal.";
			
			senderAction(senderId);
			
			sendMessage(senderId, {text: message}).then(() => {
				sendMessage(senderId, { text: message2 }).then(() => {
					sendMessage(senderId, {  text: message3}).then(() => {
						sendMessage(senderId, { text: '🎈' });
					})
				});
			});
		});
	}
}


// a = {
// 	sender: { id: '3841933512543296' },
// 	recipient: { id: '1072142362920666' },
// 	timestamp: 1648988311807,
// 	read: { watermark: 1648988310967 }
// }

// 	Received message from senderId: 3841933512543296
// 	Message is: {
// 		"mid":"m_2n3tStFgsuQ4289GkwOXy8DJS7NEMUGGfuz1I-ub5-fgYelLV3MkwyklTxz0nd8IywsA5jKG46H6HqfHrNE6uQ","text":"hello","nlp":{"intents":[],"entities":{},"traits":{"wit$sentiment":[{"id":"5ac2b50a-44e4-466e-9d49-bad6bd40092c","value":"positive","confidence":0.5435}],"wit$greetings":[{"id":"5900cc2d-41b7-45b2-b21f-b950d3ae3c5c","value":"true","confidence":0.9999}]},"detected_locales":[{"locale":"en_XX","confidence":0.92}]}}
// 	timestamp: 1648988311711,
// 	message: {
// 	mid: 'm_2n3tStFgsuQ4289GkwOXy8DJS7NEMUGGfuz1I-ub5-fgYelLV3MkwyklTxz0nd8IywsA5jKG46H6HqfHrNE6uQ',
// 	text: 'hello',
// 	nlp: {
// 		{
// 			sender: { id: '3841933512543296' },
// 			recipient: { id: '1072142362920666' },
// 			intents: [],
// 			entities: {},
// 			traits: [Object],
// 			detected_locales: [Array]
// 		}
// 	}
// }
function processMessage(event) {
    if (!event.message.is_echo) {
        const senderId = event.sender.id;
        // const message = event.message.text;
        var message = event.message;

        console.log("Received message from senderId: " + senderId);
        console.log("Message is: " + JSON.stringify(message));

        // You may get a text or attachment but not both
        if (message.text) {
            var formattedMsg = message.text.toLowerCase().trim();

            // If we receive a text message, check to see if it matches any special
            // keywords and send back the corresponding movie detail.
            // Otherwise search for new movie.
            switch (formattedMsg) {
                case "plot":
                case "date":
                case "runtime":
                case "director":
                case "cast":
                case "rating":
                    getMovieDetail(senderId, formattedMsg);
                    break;
                default:
                    findMovie(senderId, formattedMsg);
                    break;
            }

        } else if (message.attachments) {
            sendMessage(senderId, null, "Sorry, I don't understand your request.", null, null);
        }
    }
    else if (event.message.text) {
        const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'crowdbotics_bot' });
        apiaiSession.on('response', (response) => {
            const result = response.result.fulfillment.speech;
            sendTextMessage(senderId, result);
        });
        apiaiSession.on('error', error => console.log(error));
        apiaiSession.end();
    }

	else if (!event.message.is_echo) {
		const message = event.message;
		const senderId = event.sender.id;
		console.log("Received message from senderId: " + senderId);
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
				senderAction(senderId);
				// after the response is recieved we will send the details in a Generic template
				sendGenericTemplate(senderId, body);
			});
		}
	}
}


/**
 * Handle messages sent by player directly to the game bot here
 */
function receivedMessage(event) {}

/**
 * Handle game_play (when player closes game) events here.
 */
function receivedGameplay(event) {
    // Page-scoped ID of the bot user
    var senderId = event.sender.id;
    // FBInstant player ID
    var playerId = event.game_play.player_id;
    // FBInstant context ID 
    var contextId = event.game_play.context_id;
    // Check for payload
    if (event.game_play.payload) {
        // The variable payload here contains data set by
        // FBInstant.setSessionData()
        var payload = JSON.parse(event.game_play.payload);
        // In this example, the bot is just "echoing" the message received
        // immediately. In your game, you'll want to delay the bot messages
        // to remind the user to play 1, 3, 7 days after game play, for example.
        sendMessage(senderId, null, "Want to play again?", "Play now!", payload);
    }
}

// Handles messages events
function handleMessage(senderId, received_message) {
    let response;

    // Check if the message contains text 
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me and image!`
        }
    } else if (received_message.attachments) {

        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.uri;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "titile": "Is this the right picure?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [{
                            "type": "postback",
                            "titie": "Yes!",
                            "payload": "yes"
                        },{
                            "type": "postback",
                            "titie": "No!",
                            "payload": "no"
                        }]
                    }]
                }
            }
        }
    }

    // Sends the response message
    callSendMessage(senderId, response);
}

// Handles messaging_postbacks events
function handlePostback(senderId, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another message"}
    }

    // Send the message to acknowledge the postback
    callSendMessage(senderId, response);
}

function sendGetStarted(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Welcome to the Bot Hotel, I can help with any of the three requests below.",
                    "buttons":[{
                        "type": "postback",
                        "title": "Check in",
                        "payload": "check_in"
                    }, {
                        "type": "postback",
                        "title": "Room Service",
                        "payload": "room_service"
                    }, {
                        "type": "phone_number",
                        "title": "Call Reception",
                        "payload": "+16505551234"
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}

/**
 * Send bot message
 *
 * player (string) : Page-scoped ID of the message recipient
 * context (string): FBInstant context ID. Opens the bot message in a specific context
 * message (string): Message text
 * cta (string): Button text
 * payload (object): Custom data that will be sent to game session
 */
function sendMessage(player, context, message, cta, payload) {
    var button = {
        "type": "game_play",
        "title": cta
    };

    if (context) {
        button.context = context;
    }
    if (payload) {
        button.payload = JSON.stringify(payload)
    }
    var messageData = {
        "recipient": {
            "id": player
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": message,
                            "buttons": [button]
                        }
                    ]
                }
            }
        }
    };
    callSendAPI(messageData);
}

/**
 * Sends messages to user via the Send API
 */
function callSendMessage(recipientId, message) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": recipientId
        },
        "message": response
    };

    // Send the HTTPS request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.12/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
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
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, messageData, cb = null) {
    const recipientId = sender_psid;

    var graphUrl = "https://graph.facebook.com/v2.6/me/messages";
    var graphApiUrl = graphUrl + '?access_token=' + process.env.PAGE_ACCESS_TOKEN;

    // Construct the message body
    let request_body = {
        "recipient": { "id": recipientId },
        "message": messageData,
        "body": messageData
    };

    // Send the HTTP request to the Messenger Platform
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: "POST",
        json: request_body
    }, (error, response, body) => {
        if (error) {
            console.error('Error sending message: ', 'error', error, 'status code', response.statusCode, 'body', body);
        } else {
            console.log('send api returned', 'error', error, 'status code', response.statusCode, 'body', body);
            if (cb) cb();
        }
    });
}

function findMovie(userId, movieTitle) {
    request("http://www.omdbapi.com/?type=movie&t=" + movieTitle, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieObj = JSON.parse(body);

            if (movieObj.Response === "True") {
                var query = {user_id: userId};
                var update = {
                    user_id: userId,
                    title: movieObj.Title,
                    plot: movieObj.Plot,
                    date: movieObj.Released,
                    runtime: movieObj.Runtime,
                    director: movieObj.Director,
                    cast: movieObj.Actors,
                    rating: movieObj.imdbRating,
                    poster_url: movieObj.Poster
                };

                var options = {upsert: true};
                Movie.findOneAndUpdate(query, update, options, function(err, mov) {
                    if (err) {
                        console.log("Database error: " + err);
                    } else {
                        var message = {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "generic",
                                    "elements": [{
                                        "title": movieObj.Title,
                                        "subtitle": "Is this the movie you are looking for?",
                                        "image_url": movieObj.Poster === "N/A" ? "http://placehold.it/350x150" : movieObj.Poster,
                                        "buttons": [{
                                            "type": "postback",
                                            "title": "Yes",
                                            "payload": "Correct"
                                        }, {
                                            "type": "postback",
                                            "title": "No",
                                            "payload": "Incorrect"
                                        }]
                                    }]
                                }
                            }
                        };
                        sendMessage(userId, message);
                    }
                });
            } else {
                console.log(movieObj.Error);
                sendMessage(userId, {text: movieObj.Error});
            }
        } else {
            sendMessage(userId, {text: "Something went wrong. Try again."});
        }
    });
}

function getMovieDetail(userId, field) {
    Movie.findOne({user_id: userId}, function(err, movie) {
        if(err) {
            sendMessage(userId, {text: "Something went wrong. Try again"});
        } else {
            sendMessage(userId, {text: movie[field]});
        }
    });
}

function findMusic(userId, musicTitle) {
    request("http://www.omdbapi.com/?type=movie&t=" + musicTitle, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var musicObj = JSON.parse(body);
            if (musicObj.Response === "True") {
                var query = {user_id: userId};
                var update = {
                    user_id: userId,
                    title: musicObj.Title,
                    plot: musicObj.Plot,
                    date: musicObj.Released,
                    runtime: musicObj.Runtime,
                    director: musicObj.Director,
                    cast: musicObj.Actors,
                    rating: musicObj.imdbRating,
                    poster_url:musicObj.Poster
                };
                var options = {upsert: true};
                Music.findOneAndUpdate(query, update, options, function (err, mus) {
                    if (err) {
                        console.log("Database error: " + err);
                    } else {
                        var message = {
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "generic",
                                    "elements": [{
                                        "title": musicObj.Title,
                                        "subtitle": "Is this the movie you are looking for?",
                                        "image_url": musicObj.Poster === "N/A" ? "http://placehold.it/350x150" : musicObj.Poster,
                                        "buttons": [{
                                            "type": "postback",
                                            "title": "Yes",
                                            "payload": "Correct"
                                        }, {
                                            "type": "postback",
                                            "title": "No",
                                            "payload": "Incorrect"
                                        }]
                                    }]
                                }
                            }
                        };
                        sendMessage(userId, message);
                    }
                });
            } else {
                console.log(musicObj.Error);
                sendMessage(userId, {text: musicObj.Error});
            }
        } else {
            sendMessage(userId, {text: "Something went wrong. Try again."});
        }
    });
}

function getMusicDetail(userId, field) {
    Music.findOne({user_id: userId},
        function(err, music) {
            if(err) {
                sendMessage(userId, {
                    text: "Something went wrong. Try again"});
            } else {
                sendMessage(userId, {text: music[field]});
            }
        });
}

const askTemplate = (text) => {
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Cats",
                        "payload":"CAT_PICS"
                    },
                    {
                        "type":"postback",
                        "title":"Dogs",
                        "payload":"DOG_PICS"
                    }
                ]
            }
        }
    }
};

const imageTemplate = (type, sender_id) => {
    return {
        "attachment":{
            "type":"image",
            "payload":{
                "url": getImage(type, sender_id),
                "is_reusable":true
            }
        }
    }
};

let users = {};

const getImage = (type, sender_id) => {
    // create user if doesn't exist
    if(users[sender_id] === undefined){
        users = Object.assign({
            [sender_id] : {
                'cats_count' : 0,
                'dogs_count' : 0
            }
        }, users);
    }

    let count = images[type].length,    // total available images by type
        user = users[sender_id],        // user requesting image
        user_type_count = user[type+'_count'];

    // update user before returning image
    let updated_user = {
        [sender_id] : Object.assign(user, {
            [type+'_count'] : count === user_type_count + 1 ? 0 : user_type_count + 1
        })
    };

    // update users
    users = Object.assign(users, updated_user);

    console.log(users);
    return images[type][user_type_count];
};

// Get Message
function getMessage(message_obj) {
    var message = message_obj.message.text;
    console.log(message)
}

// Send Message
function sendMessage(recipient_id, message) {
    var messageData = {
        recipient: {
            id: recipient_id
        },
        message: {
            text: message
        }
    }

    request({
        uri: 'https://graph.facebook.com/v3.2/me/messages',
        qs: {
            access_token: FB_ACCESS_TOKEN
        },
        method: 'POST',
        json: messageData
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Messeage sent successsfully.");
        } else {
            console.log("Message failed - " + response.statusMessage);
        }
    });
}


module.exports = router;