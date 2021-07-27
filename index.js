const cors = require('cors')
const express = require('express')
const app = express()
const port = 9000
const knex = require('knex')
const databaseConfig = require('./knexfile').development
const database = knex(databaseConfig)

app.use(cors())
app.use(express.json()) //this will parse json from a req.body 

const Climb = require('./models/Climb')
const { User } = require('./models/User')

app.get('/users', (req, res) => {
    User.query() // database('users') = go get the users table
    .withGraphFetched('climbs')
    .then(users => res.json(users))
})

app.get('/climbs', (req, res) => {
    Climb.query()
     .then(climbs => res.json(climbs))
})

app.listen(port, () => console.log(`listening on port ${port}`))

