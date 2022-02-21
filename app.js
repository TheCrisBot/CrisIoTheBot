let express = require("express");
let bodyParser = require("body-parser");
let passport = require('passport');
let FacebookTokenStrategy = require('passport-facebook-token');
let FacebookStrategy = require('passport-facebook').Strategy;
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let fs = require('fs-extra');
let path = require('path');
let cors = require('cors');
// let pino = require('pino-http')();
let dt = require('./lib/myfirstmodel');
let { check_fb_signature, allowCrossDomain, isLoggedIn } = require("./lib/middlewares");
// let xmlParser = require('./lib/parser');
let keys = require("./config");
let db = require("./lib/database");
// var tunnel = require("./lib/tunnel");

// Creating express app
const app = express();
const router = express.Router();

// Creating an instance for Database
// new db(app);
new db('mongodb');

// importing models
require("./models/music");
require('./models/movie');
require('./models/quote');
require('./models/stockQuote');
require('./models/phonetracker');

const PORT = process.env.PORT || 3456;
// initiating configurations
app.set('port', PORT);
// app.set('env', 'production');
// Tell express where it can find the templates
// app.set('views', path.join(__dirname + '/views'));
// Set ejs as the default template
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);
// Make the files in the app/ folder available to the world
// app.use(express.static(path.join(__dirname, 'views')));
// app.use('/images', express.static(path.join(__dirname, 'client/img')));

// app.use(bodyParser.urlencoded({extended: true}));
// Check Facebook Signature
app.use(bodyParser.json({
  verify: check_fb_signature
}));
// app.use(pino);

// app.use(passport.initialize({userProperty: 'currentUser' }));
// app.use(passport.session({ secret: 'keyboard cat' }));

// /** Registers a function used to serialize user objects into the session. */
// passport.serializeUser((user, done) => {
// 	console.log(user);
// 	done(null, user._id);
// });

// /** Registers a function used to deserialize user objects out of the session. */
// passport.deserializeUser((id, done) => {
// 	User.findById(id).then((user) => {
// 		done(null, user);
// 	});
// });

// additional setup to allow CORS requests
// app.use(allowCrossDomain);
// app.options('*', cors(middlewares.cors));
// app.use(cors(cors));
// app.use(referrerHeader());
// app.use(isLoggedIn);
// restrict access for visitors
// app.use(middlewares.auth);

/**
 * Use the GoogleStrategy within Passport.
 * Strategies in Passport require a `verify` function, which accept
 * credentials (in this case, an accessToken, refreshToken, and Google
 * profile), and invoke a callback with a user object.
 */
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://www.example.com/auth/google/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }));

// var page = fs.readFileSync(__dirname + '/index.html', 'utf8');

/**
 * redirect / to /api
 */
app.get("/", function(req, res) {
  // res.redirect('/api');
  res.send("Working");
});

/**
 * How the api is structured
 * / -> throws docs as .html
 * /api ->
 * /api/webhook -> webhooks for authenticating social services like facebook, twitter, instagram, etc
 * /api/webhook/facebook
 * /api/webhook/twitter
 * /api/webhook/instagram
 * /api/oauth -> uses passport to authenticate me in my other services
 * /api/stocks -> exposes stocks data from pngx.com
 * /api/stocks/:symbol/historicals
 * /api/stocks/historicals/:symbol
 */

/**
 * register /api endpoint
 */
app.use('/api', router);
app.use('/api', require('./routes/api'));

module.exports = app;