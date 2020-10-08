import React, { useState, useEffect } from "react";

const NavBar = () => {
  return (
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
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <button className="btn btn-outline-success my-2 my-sm-0 btn-sm">
                New Todo
              </button>
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
      </div>
    </nav>
  );
};

export default NavBar;
