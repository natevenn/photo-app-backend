var debug = require('debug')('app:config')

var env = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[env];
debug(config);
module.exports = require('knex')(config);

