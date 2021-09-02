let express = require("express");
let bodyParser = require("body-parser");
// let passport = require('passport');
// let FacebookTokenStrategy = require('passport-facebook-token');
// let FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let fs = require('fs-extra');
let path = require('path');
let cors = require('cors');
// let pino = require('pino-http')();

var dt = require('./lib/myfirstmodel');
// var middlewares = require('./lib/middlewares');
// var xmlParser = require('./lib/parser');

// Models
require("./models/music");
require('./models/movie');
require('./models/quote');
require('./models/phonetracker');

// Creating express app
const app = express();
const router = express.Router();

// Express configuration
app.set('port', process.env.PORT || 3456);
// app.set('env', 'production');
// Tell express where it can find the templates
// app.set('views', path.join(__dirname + '/views'));
//Set ejs as the default template
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);
// Make the files in the app/ folder avilable to the world
// app.use(express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'client')));
// app.use('/images', express.static(path.join(__dirname, 'client/img')));

app.use(bodyParser.urlencoded({extended: true}));
// Check Facebook Signature
app.use(bodyParser.json({
  // verify: check_fb_signature
}));
// app.use(pino);

function check_fb_signature(req, res, buf) {
    console.log('Check facebook signature step.')
    var fb_signature = req.headers["x-hub-signature"];
    if (!fb_signature) {
        throw new Error('Signature ver failed.');
    } else {
        var sign_splits = signature.split('=');
        var method = sign_splits[0];
        var sign_hash = sign_splits[1];

        var real_hash = crypto.createHmac('sha1', FB_APP_SECRET)
            .update(buf)
            .digest('hex');

        if (sign_hash != real_hash) {
            throw new Error('Signature ver failed.');
        }
    }
}

// app.use(passport.initialize());
// // app.use(passport.session());

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
// app.use(middlewares.allowCrossDomain);
// app.options('*', cors(middlewares.cors));
// app.use(cors(middlewares.cors));
// app.use(middlewares.referrerHeader());
// app.use(middlewares.isLoggedIn);

// restrict access for visitors
// app.use(middlewares.auth);

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
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

app.use('/api', router);
app.use('/api', require('./routes/api'));
require('./routes/bot')(app);

module.exports = app;