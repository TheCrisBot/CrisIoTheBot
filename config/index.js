'use strict';
require('dotenv').config();

// Load the correct configuration file according to the 'NODE_ENV' variable
// module.exports = require('./env/' + process.env.NODE_ENV + '.js');
module.exports = require('./env/development.js');