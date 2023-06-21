const express = require("express");
const User = require("../database");
const jwt = require("jsonwebtoken");
const router = express.Router();

const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const decode = jwt.verify(token, "abc");
    req.user = await User.findById(decode._id);
    next();
  } else {
    res.render("login");
  }
};

router.get("/", isAuth, (req, res) => {
  res.render("index", {
    myUser: req.user.username,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

module.exports = router;
