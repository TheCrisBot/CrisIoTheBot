"use strict";
// let api = exports = module.exports = require('express').Router();

module.exports = function(router) {
const INSTAGRAM_API_URL = "https://api.instagram.com/v1/";
var data = {};

// client_secret: bb7bfd4e5a82470e84da1e35395ac959 
// client_id: 7f5898346c27461884b8b698ae28687f

// access_token
// curl -F 'client_id=7f5898346c27461884b8b698ae28687f' \
//     -F 'client_secret=bb7bfd4e5a82470e84da1e35395ac959' \
//     -F 'grant_type=authorization_code' \
//     -F 'redirect_uri=https://crisbot.herokuapp.com/webhook' \
//     -F 'code=3453' \
//     https://api.instagram.com/oauth/access_token

	data = Object.assign(data, {
		client_id: '',
		client_secret: ''
	});

	if (data.client_id == null && data.client_secret == null) {
		throw 'You must provide an access token or a client id';
	}

/**
 * GET /api/v1/instagam/photos
 * Get photos from instagram
 */
router.get("/instagram/photos", function (req, res, next) {
	res.send("Welcome to StuckWanYah instagram. I collect peeple's photos from instagram, you vote who's hotter?")
});
router.post("/instagram/photos", function(req, res, next){
	var body = req.body;
	Photo.findOne({ instagramId: body.user.id }, function(err, existingUser){
		if (existingUser) {
			var token = createToken(existingUser);
			return res.send({ token: token, user: existingUser });
		}

		var user = new User({
			instagramId: body.user.id,
			username: body.user.username,
			displayName: body.user.full_name,
			picture: body.user.profile_picture,
			accessToken: body.access_token
		});

		user.save(function(){
			var token = createToken(user);
			res.send({ token: token, user: user });
		});
	});
});

return router;
};
