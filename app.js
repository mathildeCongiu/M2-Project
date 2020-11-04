require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");

hbs.registerHelper("setChecked", function (value, currentValue) {
  if (value == currentValue) {
    return "checked";
  } else {
    return "";
  }
});

var indexRouter = require("./routes/index");
var gameRouter = require("./routes/game");
var othersRouter = require("./routes/others");

var app = express();

//require configs
require("./configs/db.config");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 3600000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    resave: true,
    saveUninitialized: false,
  })
);

app.use("/", indexRouter);
app.use("/", gameRouter);
app.use("/others", othersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");

  if (res.status(404)) {
    res.render("error-404");
  } else {
    res.render("error-500");
  }
});

module.exports = app;
