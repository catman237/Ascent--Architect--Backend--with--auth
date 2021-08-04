const { Model } = require('objection') //just bring in the Model from objection
const database = require('../db')
Model.knex(database) //this is how to connect the database to the objection model

class Climb extends Model {
    static tableName = 'climbs'
    

}

module.exports =  { Climb }