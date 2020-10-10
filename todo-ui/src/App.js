import React, { Component, useState } from "react";
import "./App.css";

import NavBar from "./components/navBar";
import MyEditor from "./components/editor/editor";
import Register from "./components/register";
import Profile from "./components/profile";
import NewTodo from "./components/editor/newTodo";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/login";
import Index from "./components/index"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([{}]);
  const [pendingTodos, setPendingTodos] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [authorized,setAuthorized] = useState(false);
  const [name,setName] = useState("");
  //syncState to update state
  const syncState = (todos) => {
    let cnt = 0;
    todos.map((todo, index) => {
      if (todo.inProgress) cnt++;
    });

    setTodos(todos);
    setInProgress(cnt);
    setPendingTodos(todos.length - cnt);
  };

  const addTodo = (todo) => {
    let todos1 = todos;
    todos1.push(todo);
    syncState(todos1);
  };

  return (
    <React.StrictMode>
    <Router>
      <NavBar addTodo={addTodo} authorized={authorized} setAuthorized={setAuthorized} />
      <Switch>
        <Route exact path="/">
          <Register />
        </Route>
        <Route exact path="/index">
          <Index authorized={authorized} setAuthorized={setAuthorized} setName={setName}/>
        </Route>
        <Route exact path="/login">
          <Login 
            authorized={authorized} 
            setAuthorized={setAuthorized} 
            setName={setName}
          />
        </Route>
        <Route exact path="/profile">
          <Profile 
            syncState={syncState}
            addTodo={addTodo}
            todos={todos}
            authorized={authorized}
            name={name}
            setAuthorized={setAuthorized}
            inProgress={inProgress}
            pendingTodos={pendingTodos}
          />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
  );
}

export default App;
