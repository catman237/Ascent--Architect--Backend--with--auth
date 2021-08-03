require('dotenv').config()
const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const config = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config);
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { authenticate } = require('./Auth')

router.get('/logout', authenticate, (_, res) => {
    res.cookie('jwt', '')
})

router.get('/users', (_, res) => {
    User.query()
        .withGraphFetched('climbs')
        .then(users => res.status(200).json(users))
})

// router.delete('/users', (req, res) => {
//     User.query()
//     .delete()
//     .then(deletedUser => res.status(200).json(deletedUser))
// })

router.get('/users/:id', (req, res) => {
    const id = req.params.id
    console.log('USER', req.user)
    User.query()
        .where('id', id)
        .first()
        .then(user => res.status(200).json(user))
})

router.delete('/users/:id', (req, res) => {
    User.query()
        .where('id', req.params.id)
        .delete()
        .then(deletedUser => res.status(200).json(deletedUser))
})


router.post('/login', (req, res) => {
    const { user } = req.body
    User.query()
        .findOne({ username: user.username || '' })
        .then(existingUser => {
            if (!existingUser) {
                res.status(401).json({ message: 'Invalid username of password 1 ' })
            } else {
                bcrypt.compare(user.password, existingUser.password_digest)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.status(401).json({ message: 'Invalid username or password 2' })
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
                .then(newUser => {
                    const secret = process.env.AUTH_SECRET
                    const payload = { user_id: newUser.id }
                    const token = jwt.sign(payload, secret)
                    res.status(201).json({ ...newUser, token })
                })
        })
})

module.exports = { userRouter: router }
