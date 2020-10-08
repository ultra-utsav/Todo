import React from "react";
import logo from "./logo.svg";
import "./App.css";

import NavBar from "./components/navBar";
import MyEditor from "./components/editor/editor";
import Register from "./components/register";
import Profile from "./components/profile";
import NewTodo from "./components/editor/newTodo";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <React.StrictMode>
      <NavBar />
      <Profile />
    </React.StrictMode>
  );
}

export default App;
