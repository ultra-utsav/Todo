const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  todos: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      inProgress: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
