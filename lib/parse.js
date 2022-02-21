// const Parse = require('parse');

// Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
// Parse.serverURL = 'http://YOUR_PARSE_SERVER:1337/parse';

// const GameScore = Parse.Object.extend("GameScore");

// const gameScore = new GameScore();

// gameScore.set("score", 1337);
// gameScore.set("playerName", "Sean Plott");
// gameScore.set("cheatMode", false);

// gameScore.save()
// 		.then((gameScore) => {
// 			// Execute any logic that should take place after the object is saved.
// 		 	alert('New object created with objectId: ' + gameScore.id);
// 		}, (error) => {
// 		// Execute any logic that should take place if the save fails.
// 		// error is a Parse.Error with an error code and message.
// 		alert('Failed to create new object, with error code: ' + error.message);
// 	});

// const query = new Parse.Query(GameScore);
// query.get("playerName")
// 	.then((gameScore) => {
// 		// The object was retrieved successfully.
// 	}, (error) => {
// 		// The object was not retrieved successfully.
// 		// error is a Parse.Error with an error code and message.
// 	});
