const express = require('express')
const router = express.Router()
const { Climb } = require('../models/Climb')

router.get('/climbs', (_, res) => {
    Climb.query()
        .then(climbs => res.json(climbs))
})

module.exports = { climbRouter: router }