const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    duration: String,
    equipmentNeeded: String,
    warmup: String,
    cooldown: String,
    description: String,
    video: String
  },
  {timestamps: true}
)

const Workouts = mongoose.model('Workout', workoutSchema)
module.exports = Workouts
