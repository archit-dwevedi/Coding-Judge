import React, { Component } from "react";
const NavBar = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">
            # <span class="sr-only">(current)</span>
          </a>
          <a class="nav-item nav-link" href="#">
            Title
          </a>
          <a class="nav-item nav-link" href="#">
            Frequency
          </a>
          <a
            class="nav-item nav-link"
            href="#"
            //tabindex="-1"
            aria-disabled="true"
          >
            Difficulty
          </a>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
