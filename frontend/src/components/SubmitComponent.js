import React, { useState, Component } from "react";
import SubmitDetailButton from "./SubmitDetail";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Axios from "axios";

class Submit extends Component {
  state = {
    value: "select",
    id: "",
    language: "",
    code: "",
  };

  change = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ id: event.target.id });
    this.setState({ language: event.target.value });
  };
  savedata = () => {
    let problem_id = this.props.match.params.problem_id;
    var data = {
      language: this.state.language,
      user: 2,
      problems: parseInt(problem_id),
      code: this.state.code,
      verdict: 1,
      ProblemFilter: false,
    };
    console.log(this.state.language);
    const token = localStorage.getItem("token");

    Axios.post("http://localhost:8000/submissions/", data, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        window.alert("success");
        window.open("/submissions", "_self");
      })
      .catch((error) => {
        window.alert("error");
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <br />
        <label> Select Language: </label>
        <select
          className="btn btn-secondary btn-sm dropdown-toggle"
          id="lang"
          onChange={this.change}
          value={this.state.value}
        >
          <option value="select">Select Language</option>
          <option value="Java" id="Java">
            Java
          </option>
          <option value="C++" id="C++">
            C++
          </option>
          <option value="Python" id="Python">
            Python
          </option>
          <option value="C" id="C">
            C
          </option>
        </select>
        <br />

        <label>Enter Code</label>
        <br />

        <textarea
          onChange={(e) => {
            this.setState({ code: e.target.value.toString() });
          }}
          id="sourceCodeTextarea"
          name="source"
          style={{
            width: "80%",
            height: "390px",
            display: "inline-block",
            fontSize: "15px",
          }}
        ></textarea>
        <br />
        <button className="btn btn-primary" onClick={this.savedata}>
          Submit
        </button>
      </div>
    );
  }
}

export default Submit;
