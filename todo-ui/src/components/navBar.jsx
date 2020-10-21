import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import NewTodo from "./editor/newTodo";

const NavBar = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" >
          TODO
        </a>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          {props.user.authorized && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
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
            {/* <li class="nav-item">
              <a class="nav-link" href="#">
                <button
                  className="btn btn-danger my-2 my-sm-0 btn-sm"
                  type="submit"
                >
                  Logout
                </button>
              </a>
            </li> */}
          </ul>
          )}
          {!props.user.authorized && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">
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

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

export default connect(mapStateToProps)(NavBar);
