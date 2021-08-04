const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')


const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    
    console.log('ran authenticate')
    
    if (!authorization) {
        res.status(403).send({ error: 'no bearer token present' })
    } else {
        const token = authorization.split(' ')[1]
        const secret = process.env.AUTH_SECRET
   
        try {
            const decodedToken = jwt.verify(token, secret)
            const { user_id } = decodedToken

            User.query()
                .findById(user_id)
                .then(existingUser => {
                    req.user = existingUser
                    next()
                })
        } catch (error) {
       
            res.status(403).send({ error: 'invalid token 2' })
        }
    }
}

module.exports = { authenticate }
