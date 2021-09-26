const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const viewRoutes = require("./routes/htmlRoutes");
const PORT = process.env.PORT || 3000;
const api = require("./routes/api");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(api);

app.use(viewRoutes);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.post("/submit", ({ body }, res) => {
//   User.create(body)
//     .then((dbUser) => {
//       res.json(dbUser);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
