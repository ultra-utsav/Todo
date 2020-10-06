const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const cfg = require("../config");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(400).send("invalid email address!");
    } else if (user) {
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          res.status(400).send("invalid password!");
        } else {
          const payload = { email };
          const token = jwt.sign(payload, cfg.secret, { expiresIn: "10m" });
          res.cookie("token", token, { httpOnly: true });
          res.status(200).send("login Successful!");
        }
      });
    }
  });
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(403).send("invalid Details!");
  } else {
    bcrypt.hash(password, cfg.saltRound, (err, passwordHash) => {
      if (err) {
        res.status(403).send("unable to register!");
      } else {
        const newUser = new User({
          name,
          email,
          password: passwordHash,
        });
        newUser.save((err, user) => {
          if (err) {
            console.log("internal server error!");
            res.status(403).send("internal server error!");
          } else {
            console.log("registered successfully!");
            const payload = { email };
            const token = jwt.sign(payload, cfg.secret, { expiresIn: "10m" });
            res.cookie("token", token, { httpOnly: true });
            res.status(200).send("registered successfully!");
          }
        });
      }
    });
  }
});

module.exports = router;
