import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class MyProblemSubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  receivedData = () => {
    var token = localStorage.getItem("token");

    var problem_id = this.props.problem_id;

    if (token === null) window.open("/login", "_self");
    axios
      .post(
        `http://localhost:8000/submissions/`,
        { ProblemFilter: true, problem_id: problem_id },
        {
          headers: {
            authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("MY submissions for problem are", res);
        const Submissions = (
          <div className="body">
            <ul style={{ paddingLeft: "1rem" }}>
              {res.data.map((object) => (
                <li>
                  <Link
                    to={{
                      pathname: `/submission/${object.id}`,
                      details: { code: object.code },
                    }}
                    style={{ color: "inherit" }}
                  >
                    {object.id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
        this.setState({ Submissions });
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
      });
  };
  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <div className="MySubmissions">
        <h5 className="display-5">
          <u>
            <center>Submissions</center>
          </u>
        </h5>
        {this.state.Submissions}
      </div>
    );
  }
}

export default MyProblemSubmissions;
