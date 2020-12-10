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

  const level1Points = 25;
  const level2Points = 60;
  const level3Points = 100;
  const level4Points = 150;
  let pointsMissing = 0;

  let percentMissing = 0;
  const percent25 = "/images/25.png";
  const percent50 = "/images/50.png";
  const percent75 = "/images/75.png";
  const percent100 = "/images/100.png";

  if (user.experience > level4Points) {
    lvl = 4;
    percentMissing = percent100;
  } else if (user.experience > level3Points) {
    pointsMissing = level4Points - user.experience;
    lvl = 3;
  } else if (user.experience > level2Points) {
    pointsMissing = level3Points - user.experience;
    lvl = 2;
  } else if (user.experience > level1Points) {
    pointsMissing = level2Points - user.experience;
    lvl = 1;
  } else {
    pointsMissing = level1Points - user.experience;
  }

  if (pointsMissing <= 0) {
    percentMissing = percent100;
  } else if (pointsMissing < 11) {
    percentMissing = percent75;
  } else if (pointsMissing <= 30) {
    percentMissing = percent50;
  } else {
    percentMissing = percent25;
  }

  let userLevel = user.level[lvl];

  res.render("profile", {
    user: user,
    daysPassed: daysPassed,
    userLevel: userLevel,
    pointsMissing,
    percentMissing,
  });
});

// Route Actions GET / POST (action completed, update of user)
router.get("/actions", async function (req, res, next) {
  let user = req.session.currentUser;
  const userActionPopulated = await User.findById(user._id)
    .populate("actionsPending")
    .populate("tasksPending")
    .populate("actionsActiveButton")
    .populate("actionsCompleted");
  let actions = userActionPopulated.actionsPending;
  // let actionsCompleted = userActionPopulated.actionsCompleted
  // let actionsActiveButton = userActionPopulated.actionsActiveButton

  for (let j = 0; j < actions.length; j++) {
    // let counter = 0
    let actionID = actions[j]._id;
    let actionPopulated = await Action.findById(actionID).populate("tasks");
    let actionRef = actionPopulated.ref;

    const userPopulatedTasksPending = JSON.parse(
      JSON.stringify(userActionPopulated.tasksPending)
    );

    const tasksListPending = userPopulatedTasksPending.filter((task) => {
      return task.ref === actionRef;
    });

    if (tasksListPending.length === 0) {
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $push: { actionsActiveButton: actionID },
          $pull: { actionsPending: actionID },
        },
        { new: true }
      );
      req.session.currentUser = userUpdated;
    }
  }

  const newUser = await User.findById(user._id)
    .populate("actionsPending")
    .populate("tasksPending")
    .populate("actionsActiveButton")
    .populate("actionsCompleted");

  res.render("actions", { user: newUser });
});

// Route action/:id GET
router.get("/actions/:id", async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const userPopulated = await User.findById(user._id)
      .populate("tasksPending")
      .populate("tasksCompleted");
    const action = await Action.findById(req.params.id);
    const actionRef = action.ref;

    const userPopulatedTasksPending = JSON.parse(
      JSON.stringify(userPopulated.tasksPending)
    );
    const userPopulatedTasksCompleted = JSON.parse(
      JSON.stringify(userPopulated.tasksCompleted)
    );

    const tasksListPending = userPopulatedTasksPending.filter((task) => {
      return task.ref === actionRef;
    });
    const tasksListCompleted = userPopulatedTasksCompleted.filter((task) => {
      return task.ref === actionRef;
    });

    res.render("tasks", {
      tasksListPending: tasksListPending,
      action,
      tasksListCompleted,
    });
  } catch (error) {
    console.log(error);
  }
});

// Route action completed

router.post("/actions/:id", async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const actionID = req.params.id;
    let action = await Action.findById(req.params.id);

    let exists = false;
    for (let i = 0; i < user.dinosaved.length; i++) {
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
        {
          $pull: { dinosaved: action.dino, actionsCompleted: actionID },
          $push: { actionsActiveButton: actionID },
        },
        { new: true }
      );
      req.session.currentUser = userUpdated;
      res.redirect(`/actions`);
    } else {
      const userExpUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $set: { experience: expUpdated },
          $push: { dinosaved: action.dino, actionsCompleted: actionID },
          $pull: { actionsActiveButton: actionID },
        },
        { new: true }
      );
      
      req.session.currentUser = userExpUpdated;
      res.redirect(`/actions/${actionID}/modal`);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/actions/:id/modal", async (req, res, next) => {
  const actionID = req.params.id;
  const action = await Action.findById(actionID);

  res.render("modal", { action, layout: false });
});

// Route task Post Task completed + update user
router.post("/task/:id/completed", async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const findTask = await Task.findById(taskId);

    // const taskCompleted = await Task.findByIdAndUpdate(
    //   { _id: req.params.id },
    //   { $set: { isCompleted: !findTask.isCompleted } },
    //   { new: true }
    // );
    const taskRef = findTask.ref;
    const actionRef = await Action.findOne({ ref: taskRef });
    const actionId = actionRef.id;

    const taskExp = findTask.experience;
    const user = req.session.currentUser;
    const userExp = user.experience;
    const expUpdated = taskExp + userExp;

    const userUpdated = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: { experience: expUpdated },
        $push: { tasksCompleted: taskId },
        $pull: { tasksPending: taskId },
      },
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

    const user = req.session.user;
    const userUpdated = await User.findByIdAndUpdate(
      { _id: user._id },
      { $push: { tasksPending: newTask._id } },
      { new: true }
    );
    req.session.currentUser = userUpdated;
    // await Action.update({ _id: actionId }, { $push: { tasks: newTask } });

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

router.get("/modal", (req, res, next) => {
  res.render("modal");
});

module.exports = router;
