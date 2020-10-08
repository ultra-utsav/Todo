import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./components/login";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navBar";
import MyEditor from "./components/editor/editor";
import Register from "./components/register";
import Profile from "./components/profile";

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <Profile />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
