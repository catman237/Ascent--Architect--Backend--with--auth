const { Model } = require('objection') //just bring in the Model from objection
const database = require('../db')
Model.knex(database) //this is how to connect the database to the objection model

const { Climb } = require('./Climb')

class User extends Model {
    static tableName = 'users' //static = class method of tableName users will never change for the class

    static relationMappings = {
        climbs: {
            relation: Model.ManyToManyRelation,
            modelClass: Climb,
            join: {
                from: 'users.id',
                through: {
                    from:'user_climbs.user_id',
                    to: 'user_climbs.climb_id'
                },
                to: 'climbs.id'
            }
        }
    }
}

module.exports = { User }