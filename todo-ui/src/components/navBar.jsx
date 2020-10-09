import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import NewTodo from "./editor/newTodo";
import {
  Link,
} from "react-router-dom";

const NavBar = (props) => {
  const [show, setShow] = useState(false);
  const [authorized,setAuthorized] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    };
    fetch("http://localhost:8085/authenticate",requestOptions)
    .then((res)=>{
      if(res.status === 200)
        setAuthorized(true);
    })
  });

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
          TODO
        </a>

        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          {authorized && (
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button
                  onClick={handleShow}
                  className="btn btn-outline-success my-2 my-sm-0 btn-sm"
                >
                  New Todo
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create New Todo</Modal.Title>
                  </Modal.Header>
                  <Modal.Body closeButton>
                    <NewTodo
                      handleClose={handleClose}
                      addTodo={props.addTodo}
                    />
                  </Modal.Body>
                </Modal>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button
                  className="btn btn-danger my-2 my-sm-0 btn-sm"
                  type="submit"
                >
                  Logout
                </button>
              </a>
            </li>
          </ul>
          )}
          {!authorized && (
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="/login">
                <button
                  className="btn btn-outline-success my-2 my-sm-0 btn-sm"
                  type="submit"
                >
                  Login
                </button>
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
