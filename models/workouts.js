const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    duration: String,
    equipmentNeeded: Boolean,
    warmup: Boolean,
    cooldown: Boolean,
    description: String,
    video: String
  },
  {timestamps: true}
)

const Workouts = mongoose.model('Workout', workoutSchema)
module.exports = Workouts
