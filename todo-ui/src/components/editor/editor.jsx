import React from "react";
import "./editor.css";

function MyEditor(props) {
  return (
    <div>
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <input
              class="form-control z-depth-1"
              style={{ marginInlineEnd: "1%" }}
              placeholder="Title of Todo... "
              value={props.todo.title}
            />
            {props.todo.inProgress &&
            <button
              type="button"
              style={{pointerEvents: "none"}}
              class="btn btn-info btn-bg "
            > 
            InProgress
            </button>}
          </div>
          <div class="modal-body">
            <div class="form-group shadow-textarea">
              <textarea
                class="form-control z-depth-1"
                id="exampleFormControlTextarea6"
                rows="6"
                value={props.todo.content}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            {!props.todo.inProgress &&
              <button
                type="button"
                onClick={props.handleMarkInProgress}
                class="btn btn-primary btn-sm "
              >
              In Progress
              </button>
            }            
            <button
              type="button"
              onClick={props.handleMarkComplete}
              class="btn btn-success btn-sm "
            >
              Mark As Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyEditor;
