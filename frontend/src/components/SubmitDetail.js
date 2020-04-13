import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
class SubmitDetailButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem_id: 0,
    };
  }
  check = (e) => {
    console.log(e);
    let id = this.props.match.params.problem_id;
    console.log(id);
    this.setState({ problem_id: id }, () => {
      console.log(this.state.problem_id);
    });
    console.log(this.props.isAuthenticated);
    if (this.props.isAuthenticated === true) {
      window.open(`/submit/${id}`, "_self");
    } else {
      window.alert("Login to submit");

      window.open("/user/login", "_self");
    }
  };
  render() {
    return (
      <button
        className="btn btn-primary"
        id="SubmitDetailButton"
        onClick={this.check}
      >
        Submit
      </button>
    );
  }
}

export default SubmitDetailButton;
