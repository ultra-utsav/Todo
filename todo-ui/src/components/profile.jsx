import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Editor from "./editor/editor";
import NewTodo from "./editor/newTodo";
import "./profile.css";
import  {markCompleteTodo,markInProgressTodo,fetchTodos}   from "./../redux/todo/todoAction"

function Profile(props) {
  useEffect(() => {
    if (props.user.authorized) {
      props.fetchTodos();
    }
  }, []);

  //handleMarkComplete to handle mark complete todo
  const handleMarkComplete = (index) => {
    props.markCompleteTodo(props.todo.todos[index],index)
  };

  //handleMarkInProgress to handle mark In progress todo
  const handleMarkInProgress = (index) => {
    props.markInProgressTodo(props.todo.todos[index],index);
  };

  if ( props.user.authorized )
    return (
      <div className="container">
        <div class="row profile">
          <div class="col-md-3">
            <div class="profile-sidebar">
              <div class="profile-usertitle">
                <div class="profile-usertitle-name">{props.user.name}</div>
              </div>
              <div class="profile-userbuttons">
                <button type="button" class="btn btn-warning">
                  Pending{"    "}
                  <span class="badge badge-light">{props.todo.pendingTodos}</span>
                </button>
              </div>
              <div class="profile-userbuttons">
                <button type="button" class="btn btn-success">
                  In Progress{" "}
                  <span class="badge badge-light">{props.todo.inProgress}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="profile-content">
              <div>
                {props.todo.todos.length > 0 &&
                  props.todo.todos.map((todo, index) => {
                    return (
                      <div>
                        <Editor
                          key={index}
                          todo={props.todo.todos[index]}
                          handleMarkComplete={() => handleMarkComplete(index)}
                          handleMarkInProgress={() => handleMarkInProgress(index)}
                        />
                      </div>
                    );
                  })}
                {props.todo.todos.length === 0 && <NewTodo addTodo={props.addTodo} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return <Redirect to="/login" />
}

const mapStateToProps = state => {
  return {
    user : state.user,
    todo : state.todo
  }
}
export default connect(mapStateToProps,{markCompleteTodo,markInProgressTodo,fetchTodos})(Profile);

