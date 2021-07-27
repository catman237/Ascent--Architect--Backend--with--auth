const express = require('express')
const router = express.Router()
const { User } = require('../models/User')

router.get('/users', (_, res) => {
    User.query()
        .withGraphFetched('climbs')
        .then(users => res.json(users))
})

module.exports = { userRouter: router }
