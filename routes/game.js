const express = require("express");
const router = express.Router();

const Action = require("../models/action");
const Task = require("../models/task");

//Route Profile/Dashboard GET

router.get("/profile", function (req, res, next) {
  const user = req.session.currentUser
  /*let today = new Date()
  // console.log(user._id)
  let userCreation = user.timestamps.createdAt;
  let daysPassed = Math.floor((today - userCreation/31557600000));*/
  res.render("profile", {user: user});
});

// Route Actions GET / POST (action completed, update of user)
router.get("/actions", async function (req, res, next) {
  const actions = await Action.find();
  console.log(actions);
  res.render("actions", { actions });
});

// Route action/:id GET
router.get("/actions/:id", async (req, res, next) => {
  try {
    const tasksList = await Action.findById(req.params.id).populate("tasks");

    res.render("tasks", { tasksList: tasksList });
  } catch (error) {
    console.log(error);
  }
});

// Route task Post Task completed + update user

// Route Task GET (new) POST

// Route Task GET (edit) POST

// Route POST delete
router.post("/task/:id/delete", async (req, res, next) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);
    // res.redirect('/actions')
    res.render("actions");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
