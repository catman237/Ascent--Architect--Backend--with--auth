const knex = require('knex')
const databaseConfig = require('./knexfile').development
const database = knex(databaseConfig)


module.exports = database