const { Model } = require('objection') //just bring in the Model from objection
const database = require('../db')
Model.knex(database) //this is how to connect the database to the objection model

const { Climb } = require('./Climb')

class User extends Model {
    static tableName = 'users' //static = class method of tableName users will never change for the class

    static relationMappings = {
        climbs: {
            relation: Model.HasManyRelation,
            modelClass: Climb,
            join: {
                from: 'climbs.id',
                to: 'users.climb_id'
            }
        }
    }

}

module.exports = { User }