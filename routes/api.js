/**
 * @api public
 * importing api modules and registering endpoints
 */
const restful = require('node-restful');
const request = require('request-promise');
const path = require('path');
const router = require('express').Router();

// importing models
let Movie = restful.model('movie');
let Quote = restful.model('quote');
let PhoneTracker = restful.model('phonetracker');

// registering endpoints
Movie.methods(['get', 'post', 'put', 'delete']);
Movie.register(router, '/movies');

Quote.methods(['get', 'put', 'post', 'delete']);
Quote.register(router, '/quotes');

// importing api modules
require('./webhook')(router);
require("./digicel-api")(router);
require("./telikom-api")(router);
require("./bmobile-api")(router);
require('./pngx-api')(router);
require('./oauth')(router);
require("./facebook-api")(router);
require('./instagram-api')(router);
// require('./twitter-api')(router);
require('./weather-api')(router);
// require('./imdb-api')(router);
// require('./google-api')(router);
// require('./translate-api')(router);
// require('./maps-api')(router);
// require('./sports-api')(router);
// require('./spotify-api')(router);
// require('./soundcloud-api')(router);
// require('./radio-api')(router);
require('./mail-api')(router);
// require('./iot')(router);
require('./sms-api')(router)

// router.param('id', function(req, res, next, id){
  // User.find(id, function(err, user){
  // 	if (err) {
  // 		return next(err);
  // 	} else if (!user) {
  // 		return next(new Error('failed to load user'));
  // 	}
  // 	req.user = user;
  // 	req.session.c_user = user[0].uid;
  // 	next();
  // });
  // next();
// });

/**
 * Serve index page
 */
router.get("/", function(req, res, next) {
  res.json({});

  req.on('data', function(res){
    console.log(res)
  });

  request.get("http://localhost/christianaugustyn/images/UmVRFlQVwwy.png")
      .then(function(body){
        var image = new Buffer(body, 'binary');
        console.log(image);
      });

  // the order of this list is significant; should be server preferred order
  switch (req.accepts(['json', 'html'])) {
    case 'json':
      res.setHeader('Content-Type', 'application/json');
      res.write('{"hello":"world!"}');
      break;
    case 'html':
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write('<b>hello, world!</b>');
      res.write("<br>This is one deadend endpoint. try something like /api/v1/weather");
      res.write("Deployed at " + new Date());
      break;
    default:
      // the fallback is text/plain, so no need to specify it above
      res.setHeader('Content-Type', 'text/plain');
      res.write('hello, world!');
      break
  }
  res.end()
});

PhoneTracker.methods(['post','delete']);
PhoneTracker.register(router, '/tracker');

router.get('/tracker', function(req, res) {
  let { phone, imei, email } = req.query;

  let query = PhoneTracker.find({});
  if (phone) {
    query.where({'number': {$regex: phone}});
  }
  if (imei) {
    query.where({'imei': imei});
  }
  if (email) {
    query.where({'email': {$regex: email}});
  }
  query.sort('-date_created');
  query.select('number imei email coords date_created')
  query.exec().then(function(result) {
    res.json(result);
  });
})

router.get('/test', function (req, res) {
  console.log("working");
});

router.get('/notify', function(req, res, next) {
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

router.get('/ip', function (req, res) {
  res.send("http://ip-api.com/json/{query}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,query");
});

module.exports = router;