
const express = require('express')
const router = express.Router()
const { Climb } = require('../models/Climb')
const { authenticate } = require('./Auth')

// router.use('*', (req, res, next) => {
//     console.log('url', req.url)
//     console.log(req.headers)
//     next();
// })

router.get('/climbs', authenticate,(_, res) => {``
    Climb.query()
        .orderBy('id', 'desc')
        .then(climbs => res.json(climbs))
})

router.get('/climbs/:id',(req, res) => {
    const id = req.params.id
    Climb.query()
    .where('id', id)
    .then(climb => res.json(climb))
})

router.post('/climbs', (req, res) => {
    const climb = req.body;
    climb.user_id = req.user.id;
    Climb.query()
    .insert(climb)
    .returning('*')
    .then(climb => res.send(climb))
})

router.delete('/climbs/:id', authenticate,(req, res) => {
    const id = req.params.id
    Climb.query()
    .where('id', id)
    .delete()
    .then(deletedClimb => res.json(deletedClimb))
})


router.patch('/climbs/:id', authenticate,(req, res) => {
    const id = req.params.id
    const updatedClimb = req.body
    console.log(updatedClimb)
    Climb.query()
    .where('id', id)
    .update(updatedClimb)
    .then(updatedClimb => res.status(200).json(updatedClimb))
})

module.exports = { climbRouter: router }