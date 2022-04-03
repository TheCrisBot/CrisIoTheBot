"use strict";
const api = require('express').Router();
const request = require('request');
// const apiAiClient = require('apiai')(process.env.API_AI_TOKEN);

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


/**
 * GET /webhook
 * Facebook Webhook Endpoints
 * Used for messenger verification
 */
api.get('/', function(req, res) {
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token is in the query string of the request
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
api.post('/', function(req, res) {
    console.log("Received webhook");
    console.log('Webhook messaging step.')

    let body = req.body;

    // Make sure this is a page subscription
    if (body.object === "page") {

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

            // // Check if the event is a message or postback and
            // // pass the event to the appropriate handler function
            // if (webhook_event.message) {
            //     console.log(webhook_event.message);
            // } else if (webhook_event.postback) {
            //     console.log(webhook_event.postback);
            // }

            // Iterate over each messaging event
            entry.messaging.forEach(function(event) {
                if (event.postback) {
                    processPostback(event);
                } else if (event.message) {
                    processMessage(event);
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

    // var chat_data = req.body;
    // // Make sure this is a page subscription
    // if (chat_data.object == 'page') {
    //     // Iterate over each entry
    //     chat_data.entry.forEach(function (page_body) {
    //         // Iterate over each message
    //         page_body.messaging.forEach(function (message_obj) {
    //             console.log(message_obj)
    //             if (message_obj.message) {
    //                 getMessage(message_obj);
    //                 sendMessage(message_obj.sender.id,"Greeting from Aitude!")
    //             }
    //         });
    //     });

    //     // Indicate all went well.
    //     res.sendStatus(200);
    // }
});

// route for login form
// route for processing the login form
// route for signup form
// route for processing the signup form

/**
 * Postback
 */
function processPostback(event) {
    let senderId = event.sender.id;
    // Get the payload for the postback
    let payload = event.postback.payload;
    let response;

    // Set the response based on the postback payload
    if (payload === "GET_STARTED") {
        // sendGetStarted(senderID);
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
        sendTextMessage(senderID, "Postback called");
    }
    // Send the message to acknowledge the postback
}

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

module.exports = api;