const express = require("express");
const router = express.Router();

const Action = require("../models/action");
const Task = require("../models/task");


//Route Profile/Dashboard GET

router.get('/profile', function(req, res, next) {
    res.render('profile');
  });


// Route Actions GET / POST (action completed, update of user)
router.get('/actions', async function(req, res, next) {
    const actions = await Action.find();
    res.render('actions', {actions});
  });


// Route action/:id GET

// Route task Post Task completed + update user

// Route Task GET (new) POST

// Route Task GET (edit) POST

// Route POST delete
module.exports = router;