let passport = require('passport');

/**
 * @api oauth
 * Authentication endpoint
 */
module.exports = function(router) {

	/*middlewares.isLoggedIn,*/ 
	
	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login and logout
	router.get('/facebook/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	/**
	 * Facebook Endpoints
	 * @Router /api/v1/auth/facebook
	 * Request will be redirected to Facebook
	 */
	router.get('/auth/facebook', passport.authenticate('facebook', {
		authType: 'rerequest',
		scope: ['public_profile', 'id', 'name', 'age', 'age_range', 'gender', 'profile_pic', 'picture', 'user_photos', 'user_friends', 'friends']
	}));
	
	// handle the callback after facebook has authenticated the user
	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect : '/connect'
	}), function(req, res) {
		// Successful authentication, redirect home
		res.json(req.user);
		// res.redirect('/');
	});

	/**
	 * Twitter Endpoints
	 * @Router /api/v1/auth/twitter
	 */
	router.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
		// request will be redirected to Twitter
	});
	router.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
		res.json(req.user);
	});
	
	/**
	 * Instagram Endpoints
	 * @Router /api/v1/auth/instagram
	 */
	router.get('/auth/instagram', passport.authenticate('instagram'), function(req, res) {
		// request will be redirected to Instagram
	});
	router.get('/auth/instagram/callback', passport.authenticate('instagram'), function(req, res) {
		res.json(req.user);
	});

	// GET /auth/google
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Google authentication will involve
	//   redirecting the user to google.com.  After authorization, Google
	//   will redirect the user back to this application at /auth/google/callback
	router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
	
	// GET /auth/google/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		});

	return router;	
}