const express = require("express");
const ObjectID = require("mongoose").Types.ObjectId;
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const cfg = require("../config");
const router = express.Router();
const atob = require("atob");

parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

router.post("/addTodo", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, cfg.secret, (err, token_data) => {
    if (err) res.status(403).send("got invalid token!");
    else {
      let { todo } = req.body;
      const email = parseJwt(token).email;
      console.log(todo);
      if (!email || !todo) res.status(400).send("unable to store todo!");
      else {
        Todo.findOneAndUpdate(
          { email },
          { $push: { todos: todo } },
          {
            upsert: true,
          },
          (error, success) => {
            if (error) {
              res.status(403).send("Internal Server error!");
            } else {
              res.status(200).send("todo added successfully!");
            }
          }
        );
      }
    }
  });
});

router.post("/getTodos", (req, res) => {
  const token = req.cookies.token;
  console.log("we came here");
  jwt.verify(token, cfg.secret, (err, token_data) => {
    if (err) res.status(401).send("got invalid token!");
    else {
      const email = parseJwt(token).email;
      if (!email) res.status(400).send("unable to get todos!");
      else {
        Todo.findOne({ email }, (err, todo) => {
          if (err) res.status(403).send("Internal Server Error!");
          else {
            res.status(200).send(todo);
          }
        });
      }
    }
  });
});

router.post("/deleteTodo", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, cfg.secret, (err, token_data) => {
    if (err) res.status(401).send("got invalid token!");
    else {
      const email = parseJwt(token).email;
      if (!email) res.status(400).send("unable to get todos!");
      else {
        const { title, todo } = req.body;
        Todo.updateOne(
          { email },
          { $pull: { todos: { title: title, todo: todo } } },
          (err, todo) => {
            if (err) res.status(403).send("Internal Server Error!");
            else {
              res.status(200).send("todo marked as complete successfully");
            }
          }
        );
      }
    }
  });
});

router.post("/editTodo", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, cfg.secret, (err, token_data) => {
    if (err) res.status(401).send("got invalid token!");
    else {
      const email = parseJwt(token).email;
      if (!email) res.status(400).send("unable to get todos!");
      else {
        const { todo } = req.body;
        Todo.updateOne(
          { email, "todos._id": new ObjectID(todo._id) },
          { $set: { "todos.$.inProgress": true } },
          (err, todo) => {
            console.log(todo);
            if (err) res.status(403).send("Internal Server Error!");
            else {
              res.status(200).send("todo marked as in progress successfully");
            }
          }
        );
      }
    }
  });
});

module.exports = router;
