var env = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[env];
console.log('db config', config)
module.exports = require('knex')(config);
