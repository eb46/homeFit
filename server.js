// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
const db = mongoose.connection
require('dotenv').config()

// Seed data
const workoutSeed = require('./models/seed.js')

// Port
const PORT = process.env.PORT || 3333

// Middleware
// use the public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// Database
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


////////////////////////////
////// Welcome Route ///////
////////////////////////////
app.get('/', (req, res) => {
  res.render('welcome.ejs')
})

// Controllers
const workoutController = require('./controllers/workout_controller.js')
app.use('/homefit', workoutController)

const userController = require('./controllers/user_controller.js')
app.use('/users', userController)

const sessionController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionController)




// Listener
app.listen(PORT, () => {
  console.log(`I'm listening on port: ${PORT}`);
})
