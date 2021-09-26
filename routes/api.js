const router = require("express").Router();
const Workout = require("../models/workoutSchema");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercise.duration",
        },
      },
    },
  ])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// router.put("/api/workouts") to create "addExercise"
router.put("/api/workouts/:id", async (req, res) => {
  try {
    const data = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercise: req.body } }
    );
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});
// router.post("/api/workouts") to create "createWorkout"
router.post("/api/workouts", async (req, res) => {
  const { exercise } = req.body;
  try {
    const workoutData = await Workout.create({
      exercise,
    });
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Dashboard
router.get("/api/workouts/range", async (req, res) => {
  try {
    const data = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercise.duration",
          },
        },
      },
    ]);
    res.json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
