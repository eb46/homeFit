//Dependencies
const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')

//Configuration
const users = express.Router()

users.get('/new', (req, res) => {
  res.render('users/new.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

users.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUsername) => {
    if (!foundUsername) {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      User.create(req.body, (error, createdUser) => {
        console.log('user is created', createdUser)
        res.redirect('/')
      })
    } else {
      res.send('Username already exists! Please choose a differnt username <a href="/">Back to home</a>')
    }
  })
})

module.exports = users
