const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

router.post("/addTodo", (req, res) => {
  const { email, todo } = req.body;
  if (!email || !todo) res.status(400).send("unable to store todo!");
  else {
    Todo.findOneAndUpdate(
      { email },
      { $push: { todos: todo } },
      {
        upsert: true,
      },
      function (error, success) {
        if (error) {
          res.status(403).send("Internal Server error!");
        } else {
          res.status(200).send("todo added successfully!");
        }
      }
    );
  }
});

router.post("/getTodos", (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).send("unable to get todos!");
  else {
    Todo.findOne({ email }, (err, todos) => {
      if (err) res.status(403).send("Internal Server Error!");
      else {
        res.status(200).send(todos);
      }
    });
  }
});

module.exports = router;
