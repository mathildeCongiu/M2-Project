const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("others/others");
});

router.get("/attributions", function (req, res, next) {
  res.render("others/attributions");
});

router.get("/faq", function (req, res, next) {
  res.render("others/faq");
});

router.get("/about-us", function (req, res, next) {
  res.render("others/about-us");
});

module.exports = router;
