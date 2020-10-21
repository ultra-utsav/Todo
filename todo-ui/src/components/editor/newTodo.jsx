import React, { useState } from "react";
import { connect } from "react-redux";
import  { newTodo }  from "../../redux/todo/todoAction"

function NewTodo(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if(!title || !content){
      alert("Not able to create new todo");
    }
    const todo = { title, content };
    props.newTodo(todo);
    if (props.handleClose) props.handleClose();
  };

  return (
    <div>
        <div>
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <input
                required
                  class="form-control z-depth-1"
                  placeholder="Title of Todo... "
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div class="modal-body">
                <div class="form-group shadow-textarea">
                  <textarea
                  required
                    class="form-control z-depth-1"
                    id="exampleFormControlTextarea6"
                    rows="6"
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleSubmit} class="btn btn-success btn-sm ">
                  ADD TODO
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default connect( null , { newTodo } )(NewTodo);
