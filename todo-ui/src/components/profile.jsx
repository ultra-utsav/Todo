import React, { useEffect,useState } from "react";
import { Redirect } from "react-router-dom";
import Editor from "./editor/editor";
import NewTodo from "./editor/newTodo";
import "./profile.css";
function Profile(props) {
  const [authorized,setAuthorized] = useState(false);
  //useEffect to set states before render
  useEffect(() => {
    let requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    };

    fetch("http://localhost:8085/todo/getTodos", requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if(data)
          props.syncState(data.todos);
      });
    
    requestOptions.method = "get";
    fetch("http://localhost:8085/authenticate",requestOptions)
      .then((res)=>{
        if(res.status === 200)
          setAuthorized(true);
      });
  }, props);

  //handleMarkComplete to handle mark complete todo
  const handleMarkComplete = (index) => {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify({ todo: props.todos[index] }),
    };

    fetch("http://localhost:8085/todo/deleteTodo ", requestOptions).then(
      (res) => {
        if (res.status === 200) {
          props.syncState(props.todos.filter((todo, ind) => ind != index));
          return res.json();
        }
      }
    );
  };

  //handleMarkInProgress to handle mark In progress todo
  const handleMarkInProgress = (index) => {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify({ todo: props.todos[index] }),
    };

    fetch("http://localhost:8085/todo/editTodo ", requestOptions).then(
      (res) => {
        if (res.status === 200) {
          let todos = props.todos;
          todos[index].inProgress = true;
          props.syncState(todos);
          return res.json();
        }
      }
    );
  };

  if(!authorized)
    return <Redirect to="/login" />

  return (
    <div className="container">
      <div class="row profile">
        <div class="col-md-3">
          <div class="profile-sidebar">
            <div class="profile-usertitle">
              <div class="profile-usertitle-name">Marcus Doe</div>
            </div>
            <div class="profile-userbuttons">
              <button type="button" class="btn btn-warning">
                Pending{"    "}
                <span class="badge badge-light">{props.pendingTodos}</span>
              </button>
            </div>
            <div class="profile-userbuttons">
              <button type="button" class="btn btn-success">
                In Progress{" "}
                <span class="badge badge-light">{props.inProgress}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="profile-content">
            <div>
              {props.todos.length > 0 &&
                props.todos.map((todo, index) => {
                  return (
                    <div>
                      <Editor
                        key={index}
                        title={props.todos[index].title}
                        todo={props.todos[index].todo}
                        handleMarkComplete={() => handleMarkComplete(index)}
                        handleMarkInProgress={() => handleMarkInProgress(index)}
                      />
                    </div>
                  );
                })}
              {props.todos.length == 0 && <NewTodo addTodo={props.addTodo} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
