const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
  exercise: [
    {
      type: {
        type: String,
        trim: true,
        required: true,
        // required: "Choose cardio or resistance",
      },
      name: {
        type: String,
        required: true,
        // required: "Enter the name of the exercise",
      },
      duration: {
        type: Number,
        trim: true,
        required: true,
        // required: "How many minutes?",
      },
      distance: {
        type: Number,
        trim: true,
      },
      weight: {
        type: Number,
        trim: true,
      },
      reps: {
        type: Number,
        trim: true,
      },
      sets: {
        type: Number,
        trim: true,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
