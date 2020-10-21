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
          const payload = { email, name: user.name };
          const token = jwt.sign(payload, cfg.secret, { expiresIn: "1d" });
          res.cookie("token", token);
          res.status(200).send(user);
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
            res.status(403).send("internal server error!");
          } else {
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

router.get("/authenticate", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, cfg.secret, (err, token_data) => {
    if (err) res.status(401).send("Authentication Failed!");
    else {
      const data = parseJwt(token);
      const email = data.email;
      const name = data.name;
      if (!email) res.status(400).send("Authentication Failed!");
      else {
        res.status(200).send({ email, name });
      }
    }
  });
});
module.exports = router;
