const express = require('express')
const workout = express.Router()
const Workout = require('../models/workouts.js')

module.exports = workout

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
  }).sort({title:1})
})

workout.get('/10min', (req, res) => {
  Workout.find({duration:'10 minutes'}, (error, workout10min) => {
    res.render('10min.ejs',
      {
        workouts: workout10min
      }
    )
  }).sort({title:1})
})

workout.get('/20min', (req, res) => {
  Workout.find({duration:'20 minutes'}, (error, workout20min) => {
    res.render('20min.ejs',
      {
        workouts: workout20min
      }
    )
  }).sort({title:1})
})

workout.get('/30min', (req, res) => {
  Workout.find({duration:'30 minutes'}, (error, workout30min) => {
    res.render('30min.ejs',
      {
        workouts: workout30min
      }
    )
  }).sort({title:1})
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
  if(req.body.equipmentNeeded === 'Yes') {
    req.body.equipmentNeeded = true
  } else {
    req.body.equipmentNeeded = false
  }

  if(req.body.warmup === 'Yes'){
    req.body.warmpup = true
  } else {
    req.body.warmpup = false
  }

  if(req.body.cooldown === 'Yes'){
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

/////////////////////////////
/////// Update Route ////////
/////////////////////////////
workout.put('/:id', (req, res) => {
  if(req.body.equipmentNeeded === 'Yes') {
    req.body.equipmentNeeded = true
  } else {
    req.body.equipmentNeeded = false
  }

  if(req.body.warmup === 'Yes'){
    req.body.warmpup = true
  } else {
    req.body.warmpup = false
  }

  if(req.body.cooldown === 'Yes'){
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
