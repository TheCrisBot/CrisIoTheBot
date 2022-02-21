// var referrerPolicy = require('referrer-policy');

// route middleware to make sure a user is logged in
var isLoggedIn = function(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
};


var allowCrossDomain = function(req, response, next) {
	response.header('Access-Control-Allow-Origin', ['http://localhost/', /\.zyk\.net$/]);
	response.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	response.header('Access-Control-Request-Headers', ['Content-Type', 'Authorization']);
	response.header('Access-Control-Expose-Headers', ['Content-Range', 'X-Content-Range']);
	response.header('Access-Control-Allow-Credentials', true);
	response.header('Access-Control-Max-Age', '');
	if ('OPTIONS' == req.method) {
		response.sendStatus(200);
	}
	else {
		next();
	}
};

var cors = {
	'origin': ['http://localhost/', /\.zyk\.net$/, '*'],
	'methods': "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
	'allowedHeaders': "Content-Type,Authorization",
	'preflightContinue': false,
	'optionsSuccessStatus': 204
};

var header = function(options) {
  if (options && options.allow) {
    return function (req, res, next) {
      res.setHeader('X-DNS-Prefetch-Control', 'on')
      next()
    }
  } else {
    return function (req, res, next) {
      res.setHeader('X-DNS-Prefetch-Control', 'off')
      next()
    }
  }
};

var referrerHeader = function(req, res) {
	// return referrerPolicy({policy: 'same-origin'})
};

// let basicAuth = require('basic-auth');
var auth = function(req, res, next){
	// var user = basicAuth(req);
    //
	// if (!user || user.name !== 'kitten' || user.pass !== 'secr3t') {
	// 	res.setHeader('WWW-Authenticate', 'Basic realm="example"');
	// 	res.end('Access denied');
	// } else {
	// 	next();
	// 	// res.setHeader('Content-Type', 'text/plain');
	// 	// res.write('You\'re in!');
	// 	// res.end();
	// }
}

function check_fb_signature(req, res, buf) {
    console.log('Check facebook signature step.')

    const fb_signature = req.headers["x-hub-signature"];
    if (!fb_signature) {
        throw new Error('Signature ver failed.');
    }
    else {
        let sign_splits = fb_signature.split('=');
        let method = sign_splits[0];
        let sign_hash = sign_splits[1];

        let real_hash = crypto.createHmac('sha1', keys.fb.FB_APP_SECRET)
            .update(buf)
            .digest('hex');

        if (sign_hash !== real_hash) {
            throw new Error('Signature ver failed.');
        }
    }
}

// I'm going to leave these here because it might be nice to have standardized
// error messages for common failures

exports.objectNotFound = function() {
  return {
    status: 404,
    message: 'Object not found',
    name: 'ObjectNotFound',
    errors: {
      _id: {
        message: "Could not find object with specified attributes"
      }
    }
  };
};
exports.respond404 = function() {
  return {
    status: 404,
    message: 'Page Not Found',
    name: "PageNotFound",
    errors: 'Endpoint not found for model ' + this.modelName
  };
};
exports.authFailure = function() {
  return {
    status: 401,
    message: 'Unauthorized',
    name: "Unauthorized",
    errors: 'Operation not authorzed on ' + this.modelName
  };
};
exports.badRequest = function(errobj) {
  return {
    status: 400,
    message: 'Bad Request',
    name: "BadRequest",
    errors: errobj || "Your request was invalid"
  };
};

/*
registerNamespace(api, '/digicel');

*/
exports.registerNamespace = function(app, route) {
  app.use(route, function(){
    return this;
  })
};

module.exports = {
	'isLoggedIn': isLoggedIn,
	'allowCrossDomain': allowCrossDomain,
	'header': header,
	'referrerHeader': referrerHeader,
	'cors': cors,
	'auth': auth,
    'check_fb_signature': check_fb_signature
}