import React, { useEffect } from "react";
import "./App.css";

import NavBar from "./components/navBar";
import Register from "./components/register";
import Profile from "./components/profile";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/login";
import Index from "./components/index";
import { authUser } from "./redux/user/userAction";
import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  useEffect(() => {
    if (props.user.authorized === false) {
      props.authUser();
      console.log("here");
    }
  });

  return (
    <React.StrictMode>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
          <Route exact path="/index">
            <Index />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

const mapStatetoProps = (state) => ({
  user: state.user,
  todo: state.todo,
});

export default connect(mapStatetoProps, { authUser })(App);
