import React, { Component } from "react";
import axios from "axios";
import MyProblemSubmissions from "../../components/MyProblemSubmissions";
import SubmitDetailButton from "../../components/SubmitDetail";
import "./ProblemDetailView.css";
class ProblemDetail extends Component {
  state = {
    problem: {},
  };

  componentDidMount() {
    const problem_id = this.props.match.params.problem_id;
    axios
      .get(`http://127.0.0.1:8000/problem/${problem_id}`)
      .then((res) => {
        this.setState({ problem: res.data });
      })
      .catch((error) => {
        if (error.response) {
          window.alert("Not Found");
          window.open("http://127.0.0.1:3000/problems/", "_self");
        } else if (error.request) {
          console.log(error.request);
        }
        console.log(error.config);
      });
  }

  render() {
    return (
      <div class="container-fluid" style={{ backgroundColor: "#cdd9e4" }}>
        <div className="row">
          <div className="item">
            <br />
            <h3>{this.state.problem.problem_name}</h3>
            <br />
            {this.state.problem.problem_statement}
            <h5 className="font-weight-bold ">Input</h5>
            <p className="">{this.state.problem.input_format}</p>
            <h5 className="font-weight-bold">Output</h5>
            <p className="text-left">{this.state.problem.output_format}</p>
            <p class="font-weight-bold">
              Time limit : {this.state.problem.time_limit}
            </p>
            <p class="font-weight-bold">
              {" "}
              Memory : {this.state.problem.memory_limit}
            </p>
            <p>
              <p>
                <b>Examples: </b>
                <pre>
                  <br />
                  <b>Input :</b>
                  <br />
                  {this.state.problem.testcase_input}
                  <br />
                  <b>Output :</b>
                  <br />
                  {this.state.problem.testcase_output}
                </pre>{" "}
              </p>
            </p>
            <p className="footer-copyright text-center "></p>
            <SubmitDetailButton {...this.props} />
          </div>
          <div className="item-1">
            {this.props.isAuthenticated ? (
              <MyProblemSubmissions
                problem_id={this.props.match.params.problem_id}
              />
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemDetail;
