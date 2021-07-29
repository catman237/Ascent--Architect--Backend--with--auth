require('dotenv').config()
const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const config = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config);
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { authenticate } = require('./Auth')

router.get('/users', authenticate,(_, res) => {
    User.query()
        .withGraphFetched('climbs')
        .then(users => res.status(200).json(users))
})

router.get('/users/:id', authenticate, (req, res) => {
        const id = req.params.id
        User.query()
            .where('id', id)
            .first()
            .then(user => res.status(200).json(user))
    })

router.delete('/users/:id', authenticate,(req, res) => {
    User.query()
        .where('id', req.params.id)
        .withGraphFetched('climbs')
        .delete()
        .then(deletedUser => res.status(200).json(deletedUser))
})


router.post('/login', (req, res, next) => {
    const { user } = req.body

    User.query()
        .findOne({ username: user.username || '' })
        .then(existingUser => {
            if (!existingUser) {
                res.status(401).json({ message: 'Invalid username of password' })
            } else {
                bcrypt.compare(user.password, existingUser.password_digest)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.status(401).json({ message: 'Invalid username or password' })
                        } else {
                            const secret = process.env.AUTH_SECRET
                            const payload = { user_id: existingUser.id }
                            const token = jwt.sign(payload, secret)
                            res.status(200).json({ token })
                        }
                    })
            }
        })
})


router.post('/users', (req, res) => {
    const { user } = req.body
    saltRounds = 11

    bcrypt.hash(user.password, saltRounds)
        .then(hashedPassword => {
            User.query()
                .insert({ username: user.username, password_digest: hashedPassword })
                .then(newUser => res.status(201).json(newUser))
        })
})

module.exports = { userRouter: router }
