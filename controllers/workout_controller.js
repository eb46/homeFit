const express = require('express')
const workout = express.Router()
const Workout = require('../models/workouts.js')

module.exports = workout

////////////////////////////
////// Welcome Route ///////
////////////////////////////
workout.get('/', (req, res) => {
  res.render('welcome.ejs')
})

//////////////////////////
////// Index Route ///////
//////////////////////////
workout.get('/index', (req, res) => {
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
workout.get('/seed', (req, res) => {
  Workout.create(workoutSeed, (error, data) => {
    if (error) console.log(error.message)
    console.log("added provided workout data")
  })
  res.redirect('/homefit')
})

////////////////////////
////// New Route ///////
////////////////////////
workout.get('/new', (req, res) => {
  res.render('new.ejs')
})

///////////////////////////
////// Create Route ///////
///////////////////////////
workout.post('/index', (req, res) => {
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
workout.get('/:id/edit', (req, res) => {
  Workout.findById(req.params.id, (error, foundWorkout) => {
    res.render('edit.ejs',
      {
        workout: foundWorkout
      }
    )
  })
})

workout.put('/:id', (req, res) => {
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
    res.redirect('/homefit' + req.params.id)
  })
})

/////////////////////////////
/////// Delete Route ////////
/////////////////////////////

workout.delete('/:id', (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (error, deleteWorkout) => {
    res.redirect('/homefit/index')
  })
})

///////////////////////////
/////// Show Route ////////
///////////////////////////
workout.get('/:id', (req, res) => {
  Workout.findById(req.params.id, (error, foundWorkout) => {
    res.render('show.ejs',
      {
        workout: foundWorkout
      }
    )
  })
})
