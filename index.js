const cors = require('cors')
const express = require('express')
const app = express()
const port = 9000
const knex = require('knex')
const databaseConfig = require('./knexfile').development
const database = knex(databaseConfig)
const { userRouter } = require('./routes/Users')
const { climbRouter } = require('./routes/Climbs')
const { User } = require('./models/User')
const Climb = require('./models/Climb')

app.use(cors())
app.use(express.json()) //this will parse json from a req.body 
app.use(userRouter, climbRouter)

app.listen(port, () => console.log(`listening on port ${port}`))

