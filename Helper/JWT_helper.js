const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const User = require('../models/User')
const mongoose = require('mongoose')

module.exports = {
    signAccessToken : (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
              expiresIn: '30d',
              issuer: process.env.DOMAIN,
              audience: userID,
            }
            JWT.sign(payload, secret, options, (err, token) => {
              if (err) {
                  console.log(err)
                reject(createError.InternalServerError())
                return
              }
              resolve(token)
            })
          })
    }
}