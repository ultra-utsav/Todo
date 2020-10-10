import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function NewTodo(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = () => {
    const todos = { title, content };
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify({ todo: todos }),
    };

    fetch("http://localhost:8085/todo/addTodo ", requestOptions).then((res) => {
      if (res.status === 200) {
        props.addTodo(todos);
        return res.json();
      }
    });
    if (props.handleClose) props.handleClose();
  };

  return (
    <div>
      <div>
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <input
                class="form-control z-depth-1"
                placeholder="Title of Todo... "
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="modal-body">
              <div class="form-group shadow-textarea">
                <textarea
                  class="form-control z-depth-1"
                  id="exampleFormControlTextarea6"
                  rows="6"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => handleSubmit()}
                class="btn btn-success btn-sm "
              >
                ADD TODO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTodo;
