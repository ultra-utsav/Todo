const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  todos: {
    type: [String],
    required: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
