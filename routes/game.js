const express = require("express");
const router = express.Router();

const Action = require("../models/action");
const Task = require("../models/task");
const User = require("../models/user");

//Route Profile/Dashboard GET

router.get("/profile", function (req, res, next) {
  const user = req.session.currentUser;
  // console.log(user);

  let today = new Date();
  // console.log(today);
  // console.log(user._id)
  let userCreation = new Date(user.created_at);
  // console.log(userCreation.getTime(), "here");
  let daysPassed = Math.floor(
    (today.getTime() - userCreation.getTime()) / 86400000
  );

  // crear variable para lvl e iterarlo por la array para cambiar name and img
  let lvl = 0;

  if (user.experience > 150) {
    lvl = 4;
  } else if (user.experience > 100) {
    lvl = 3;
  } else if (user.experience > 60) {
    lvl = 2;
  } else if (user.experience > 25) {
    lvl = 1;
  }

  let userLevel = user.level[lvl];

  // console.log(daysPassed);
  res.render("profile", { user: user, daysPassed: daysPassed, userLevel: userLevel });
});

// Route Actions GET / POST (action completed, update of user)
router.get("/actions", async function (req, res, next) {
  const user = req.session.currentUser;
  // console.log(user)
  const userActionPopulated = await User.findById(user._id).populate("actions");
  const actions = userActionPopulated.actions;

  // console.log(actions);
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

// Route action completed

router.post("/actions/:id", async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    // console.log(user);
    const actionID = req.params.id;
    // console.log(actionID);
    const action = await Action.findById(req.params.id);

    let exists = false;
    for (let i = 0; i < user.dinosaved.length; i++) {
      // console.log(i)
      console.log(user.dinosaved[i]);
      // console.log(action.dino)

      if (user.dinosaved[i].name == action.dino.name) {
        exists = true;
      }
    }

    const actionExp = action.experience;
    const userExp = user.experience;
    const expUpdated = actionExp + userExp;

    if (exists) {
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        { $pull: { dinosaved: action.dino } },
        { new: true }
      );
      req.session.currentUser = userUpdated;
    } else {
      const userExpUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: { experience: expUpdated } },
        { new: true }
      );
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { dinosaved: action.dino } },
        { new: true }
      );
      req.session.currentUser = userUpdated;
    }

    // console.log(user, "whyyyy");

    // console.log(action)
    // const actionPopulated = action.populate("tasks")
    // const tasks =  actionPopulated.tasks
    // const userPopulated = await User.findById(user._id).populate("actions");
    // console.log(userPopulated)
    // const userActionCompletedStatus = userPopulated.actions[action.ref-1].isCompleted;
    // console.log(userActionCompletedStatus)

    // const userUpdated = await User.updateOne(
    //   { _id: user._id },
    //   { $set: { userActionCompletedStatus: true} },
    //   {new : true}
    //   )

    //   console.log(userUpdated)
    // let allCompleted = false

    // for (let i = 0; i < tasks.length; i ++) {
    //   if (tasks[i].isCompleted) {
    //   }
    //   else {
    //     console.log("You didn't complete all the tasks")
    //     allCompleted = false
    //     return
    //   }

    //     allCompleted = true
    // }
    // action.isCompleted = true

    // console.log(allCompleted)
    // await action.updateOne(
    //   { _id: actionID },
    //   { $set: { isCompleted: true }}
    //   )

    res.redirect("/actions");
  } catch (error) {
    console.log(error);
  }
});

// Route task Post Task completed + update user
router.post("/task/:id/completed", async (req, res, next) => {
  try {
    const findTask = await Task.findById(req.params.id);

    const taskCompleted = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isCompleted: !findTask.isCompleted } },
      { new: true }
    );
    const taskRef = findTask.ref;
    const actionRef = await Action.findOne({ ref: taskRef });
    const actionId = actionRef.id;

    const taskExp = findTask.experience;
    const user = req.session.currentUser;
    const userExp = user.experience;
    const expUpdated = taskExp + userExp;

    const userUpdated = await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { experience: expUpdated } },
      { new: true }
    );

    req.session.currentUser = userUpdated;

    res.redirect(`/actions/${actionId}`);
  } catch (error) {
    console.log(error);
  }
});

// Route Task GET (new) POST
router.get("/:id/new", async (req, res, next) => {
  const tasksList = await Action.findById(req.params.id);

  res.render("new", { tasksList });
});

router.post("/:id/new", async (req, res, next) => {
  try {
    const actionId = req.params.id;
    const action = await Action.findById(actionId);
    console.log(actionId);
    const refAction = action.ref;
    console.log(refAction);
    const { title, experience, isPublic } = req.body;
    // console.log(title, experience, isPublic);
    const task = await new Task({
      title,
      experience,
      isPublic,
      ref: refAction,
    });
    const newTask = await task.save();

    await Action.update({ _id: actionId }, { $push: { tasks: newTask } });

    res.redirect(`/actions/${actionId}`);
  } catch (error) {
    console.log(error);
  }
});

// Route Task GET (edit) POST
router.get("/task/:id/edit", async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  const taskRef = task.ref;
  const actionRef = await Action.findOne({ ref: taskRef });

  res.render("edit", { task, actionRef });
});

router.post("/task/:id/edit", async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    const taskRef = task.ref;
    // console.log(refAction);
    const { title, experience, isPublic } = req.body;

    await Task.update(
      { _id: taskId },
      { $set: { title, experience, isPublic } },
      { new: true }
    );

    const actionRef = await Action.findOne({ ref: taskRef });
    const actionId = actionRef.id;

    res.redirect(`/actions/${actionId}`);
  } catch (error) {
    console.log(error);
  }
});

router.post("/task/:id/delete", async (req, res, next) => {
  try {
    let task = await Task.findByIdAndRemove({ _id: req.params.id });
    const taskRef = task.ref;
    const actionRef = await Action.findOne({ ref: taskRef });
    const actionId = actionRef.id;
    // res.redirect("/actions");
    res.redirect(`/actions/${actionId}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
