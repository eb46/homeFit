// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()

// Seed data
const workoutSeed = require('./models/seed.js')
const Workout = require('./models/workouts.js')

// Port
const PORT = process.env.PORT || 3333

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


// Middleware
// use the public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

// Controllers


// Routes
// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

////////////////////////////
////// Welcome Route ///////
////////////////////////////
app.get('/homefit', (req, res) => {
  res.render('welcome.ejs')
})

//////////////////////////
////// Index Route ///////
//////////////////////////
app.get('/homefit/index', (req, res) => {
  Workout.find({}, (error, allWorkouts) => {
    res.render('index.ejs',
      {
        workouts: allWorkouts
      }
    )
  })
})

///////////////////////////
/////// Seed Route ////////
///////////////////////////
app.get('/homefit/seed', (req, res) => {
  Workout.create(workoutSeed, (error, data) => {
    if (error) console.log(error.message)
    console.log("added provided workout data")
  })
  res.redirect('/homefit')
})

////////////////////////
////// New Route ///////
////////////////////////
app.get('/homefit/new', (req, res) => {
  res.render('new.ejs')
})

///////////////////////////
////// Create Route ///////
///////////////////////////
app.post('/homefit/index', (req, res) => {
  if(req.body.equipmentNeeded === 'on') {
    req.body.equipmentNeeded = true
  } else {
    req.body.equipmentNeeded = false
  }

  if(req.body.warmup === 'on'){
    req.body.warmpup = true
  } else {
    req.body.warmpup = false
  }

  if(req.body.cooldown === 'on'){
    req.body.cooldown = true
  } else {
    req.body.cooldown = false
  }

  Workout.create(req.body, (error, createdWorkout) => {
    res.redirect('/homefit/index')
  })
})

///////////////////////////
/////// Edit Route ////////
///////////////////////////
app.get('/homefit/:id/edit', (req, res) => {
  Workout.findById(req.params.id, (error, foundWorkout) => {
    res.render('edit.ejs',
      {
        workout: foundWorkout
      }
    )
  })
})

app.put('/homefit/:id', (req, res) => {
  if(req.body.equipmentNeeded === 'on') {
    req.body.equipmentNeeded = true
  } else {
    req.body.equipmentNeeded = false
  }

  if(req.body.warmup === 'on'){
    req.body.warmpup = true
  } else {
    req.body.warmpup = false
  }

  if(req.body.cooldown === 'on'){
    req.body.cooldown = true
  } else {
    req.body.cooldown = false
  }

  Workout.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updateWorkout) => {
    res.redirect('/homefit/' + req.params.id)
  })
})

/////////////////////////////
/////// Delete Route ////////
/////////////////////////////

app.delete('/homefit/:id', (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (error, deleteWorkout) => {
    res.redirect('/homefit/index')
  })
})


///////////////////////////
/////// Show Route ////////
///////////////////////////
app.get('/homefit/:id', (req, res) => {
  Workout.findById(req.params.id, (error, foundWorkout) => {
    res.render('show.ejs',
      {
        workout: foundWorkout
      }
    )
  })
})


// Listener
app.listen(PORT, () => {
  console.log(`I'm listening on port: ${PORT}`);
})
