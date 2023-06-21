const express = require("express");
const User = require("../database");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { username, phone, email, pass } = req.body;
  
  let data = await User.findOne({ email });
  if (data) {
    return res.redirect("/login");
  }
  const securePass = await bcrypt.hash(pass,10);

  data = await User.create({ username, phone, email, pass : securePass });

  const jwtData = jwt.sign({ _id: data._id }, "abc");

  res.cookie("token", jwtData, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  let data = await User.findOne({ email });
  
  if (!data) {
    return res.redirect("/signup");
  }
  const isPass = await bcrypt.compare(pass, data.pass);

  if (!isPass) {
    return res.render("login", {
      errorMSG: "Incorrect Password",
    });
  }
  const jwtData = jwt.sign({ _id: data._id }, "abc");

  res.cookie("token", jwtData, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

module.exports = router;
