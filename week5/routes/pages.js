const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("profile", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  res.render("logout");
});

module.exports = router;
