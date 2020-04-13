import React, { Component } from "react";
import axios from "axios";
import Problems from "../../components/Problem";
import Pages from "../../components/Pagination";
import NavBar from "../../components/NavigationBar";
class ProblemList extends Component {
  state = {
    problems: [],
  };

  render() {
    return (
      <div className="text-left" style={{ backgroundColor: "" }}>
        <h2 style={{ fontFamily: "fantasy", textAlign: "center" }}>Problems</h2>
        <Problems />
      </div>
    );
  }
}

export default ProblemList;
