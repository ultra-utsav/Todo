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
              Todo.findOne({ email }, (err, todo) => {
                res
                  .status(200)
                  .send(JSON.stringify(todo.todos[todo.todos.length - 1]));
              });
            }
          }
        );
      }
    }
  });
});

router.post("/getTodos", (req, res) => {
  const token = req.cookies.token;
  console.log("Here we came");
  jwt.verify(token, cfg.secret, (err, token_data) => {
    if (err) res.status(401).send("got invalid token!");
    else {
      const email = parseJwt(token).email;
      if (!email) res.status(400).send("unable to get todos!");
      else {
        Todo.findOne({ email }, (err, todos) => {
          if (err) res.status(403).send("Internal Server Error!");
          else {
            res.status(200).send(todos);
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
        const { todo } = req.body;
        Todo.updateOne(
          { email },
          { $pull: { todos: { _id: new ObjectID(todo._id) } } },
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
