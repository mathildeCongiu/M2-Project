var express = require("express");
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Action = require("../models/action");
const Task = require("../models/task");

/* GET home page. Add redirection to Signup, or Dashboard if logged iN*/
router.get("/", function (req, res, next) {
  res.redirect("/signup");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { layout: false });
});

router.post("/signup", async (req, res, next) => {
  if (
    req.body.email === "" ||
    req.body.password === "" ||
    req.body.name === ""
  ) {
    res.render("auth/signup", {
      errorMessage: "Indicate a username, an email and a password to sign up",
      layout: false,
    });
    return;
  }

  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  try {
    let user = await User.findOne({ email: email });
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The email already exists!",
        layout: false,
      });
      return;
    }
    var actionsArr = await Action.find();
    var tasksArr = await Task.find({owner: "5fd33239e1260618f701ecf4"});

    await User.create({
      email,
      password: hashPass,
      name,
      actionsPending: actionsArr,
      tasksPending: tasksArr,
    });

    user = await User.findOne({ email: email });
    req.session.currentUser = user;
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { layout: false });
});

router.post("/login", async (req, res, next) => {
  if (req.body.email === "" || req.body.password === "") {
    res.render("auth/login", {
      errorMessage: "Indicate a username and a password to login",
      layout: false,
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.render("auth/login", {
        errorMessage: "The email doesn't exist",
        layout: false,
      });
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect("/profile");
    } else {
      res.render("auth/login", {
        errorMessage: "Incorrect password",
        layout: false,
      });
    }
  } catch (error) {}
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

module.exports = router;
