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

// Check Facebook Signature
app.use(express.json({
  // verify: check_fb_signature
}))
app.use(express.urlencoded({ extended: true }))
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

// app.param('id', function(req, res, next, id){
  // User.find(id, function(err, user){
  //    if (err) {
  //        return next(err);
  //    } else if (!user) {
  //        return next(new Error('failed to load user'));
  //    }
  //    req.user = user;
  //    req.session.c_user = user[0].uid;
  //    next();
  // });
  // next();
// });

/**
 * Serve index page
 */
app.get("/", function(req, res) {
  // req.log.info('something')
  // res.redirect('/api');
  res.send("Working");
  // res.json({});

  // req.on('data', function(res){
  //   console.log(res)
  // });

  // request.get("http://localhost/christianaugustyn/images/UmVRFlQVwwy.png")
  //   .then(function(body){
  //     var image = new Buffer(body, 'binary');
  //     console.log(image);
  //   });

  // // the order of this list is significant; should be server preferred order
  // switch (req.accepts(['json', 'html'])) {
  //   case 'json':
  //     res.setHeader('Content-Type', 'application/json');
  //     res.write('{"hello":"world!"}');
  //     break;
  //   case 'html':
  //     res.setHeader('Content-Type', 'text/html');
  //     res.writeHead(200, {"Content-Type": "text/html"});
  //     res.write('<b>hello, world!</b>');
  //     res.write("<br>This is one deadend endpoint. try something like /api/v1/weather");
  //     res.write("Deployed at " + new Date());
  //     break;
  //   default:
  //     // the fallback is text/plain, so no need to specify it above
  //     res.setHeader('Content-Type', 'text/plain');
  //     res.write('hello, world!');
  //     break
  // }
  // res.end()
});

app.get('/notify', function(req, res, next) {
  const notifier = require('node-notifier');
  let {title, message} = req.query;

  notifier.notify({
    title: 'My awesome title',
    message: 'Hello from node, Mr. User!',
    icon: path.join(__dirname, 'change password.png'), // Absolute path (doesn't work on balloons)
    sound: true, // Only Notification Center or Windows Toasters
    wait: true // Wait with callback, until user action is taken against notification
  }, function (err, response) {
    // Response is response from notification
  });

  notifier.on('click', function (notifierObject, options) {
    // Triggers if `wait: true` and user clicks notification
    console.log("hello");
  });

  notifier.on('timeout', function (notifierObject, options) {
    // Triggers if `wait: true` and notification closes
  });

});

const request = require('request-promise');
app.get('/ip', function (req, res) {
    let { query } = req.query;
    let url = `http://ip-api.com/json/${query}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,query`;

    request.get(url)
      .then((response) => {
          res.json(JSON.parse(response));
      })
      .catch((err) => {
          console.error("Error occurred: " + err);
      });
});

/**
 * How the api is structured
 * / -> throws docs as .html
 * /api ->
 * /api/[facebook|twitter|instagram]/webhook -> webhooks for authenticating social services like facebook, twitter, instagram, etc
 * /api/facebook/webhook
 * /api/twitter/webhook
 * /api/instagram/webhook
 * /api/oauth -> uses passport to authenticate me in my other services
 * /api/stocks -> exposes stocks data from pngx.com
 * /api/stocks/:symbol/historicals
 * /api/stocks/historicals/:symbol
 */

/**
 * register /api endpoint
 */
const router = express.Router();
app.use('/api', router);

// app.use('/api', require('./routes/api'));

const routes = require('./routes/index');

// router.use('/api', require('./routes/api'));
router.use('/digicel', routes.digicel);
router.use('/telikom', routes.telikom);
router.use('/bmobile', routes.bmobile);
router.use('/pngx', routes.pngx);
router.use('/oauth', routes.oauth);
router.use('/facebook', routes.facebook);
router.use('/instagram', routes.instagram);
// router.use('/twitter', routes.twitter);
router.use('/weather', routes.weather);
// router.use('/imdb', routes.imdb);
// router.use('/google', routes.google);
// router.use('/translate', routes.translate);
// router.use('/maps', routes.maps);
router.use('/tracker', routes.tracker);
// router.use('/sports', routes.sports);
// router.use('/spotify', routes.spotify);
// router.use('/soundcloud', routes.soundcloud);
// router.use('/radio', routes.radio);
router.use('/mail', routes.mail);
// router.use('/iot', routes.iot);
router.use('/sms', routes.sms);
router.use('/zoom', routes.zoom);

module.exports = app;