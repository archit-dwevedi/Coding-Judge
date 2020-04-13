import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import * as actions from "../store/actions/auth";
import axios from "axios";
import "./UserProfile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {},
      lastupdate: 5,
      username: "",
      email: "",
      college: "",
      first_name: "",
      last_name: "",
    };
  }
  handlesubmit = (e) => {
    var data = {
      username: this.state.username,
      email: this.state.email,
      college: this.state.college,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    };
    this.setState({ data }, () => {
      localStorage.setItem("data", data);
    });
    console.log("Here in handlesubmit: ", data);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/users/user/", {
        headers: {
          authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ email: data.email, username: data.username });

        const printdata = (
          <div
            className="container"
            style={{
              backgroundImage: "linear-gradient(to right blue black)",
              color: "white",
            }}
          >
            <form>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label">
                  Email :
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control"
                    id="staticEmail"
                    value={data.email}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label">
                  Username:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control"
                    id="staticEmail"
                    value={data.username}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label">
                  FirstName:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="staticEmail"
                    placeholder={data.first_name}
                    //value="{data.first_name}"
                    onChange={(e) => {
                      this.setState({ first_name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label">
                  LastName:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="staticEmail"
                    placeholder={data.last_name}
                    onChange={(e) => {
                      this.setState({ last_name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-3 col-form-label">
                  College:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="staticEmail"
                    placeholder={data.college}
                    onChange={(e) => {
                      this.setState({ college: e.target.value });
                    }}
                  />
                  <br />
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={this.handlesubmit}
                  >
                    Submit
                  </button>
                  <br />
                  <small class="time-muted">
                    Last updated {this.state.lastupdate} mins ago
                  </small>
                </div>
              </div>
            </form>
          </div>
        );
        this.setState({ printdata });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log("data is ", localStorage.getItem("data"));

    return (
      <div
        class="container-sm-7 p-2"
        style={{
          backgroundImage: "linear-gradient(to right, #141E30, #243B55)",
        }}
      >
        <h3 class="display-4" style={{ textAlign: "center" }}>
          <span className="badge badge-dark"> My profile</span>
        </h3>
        <div class="user__profile">
          <div class="user__profile__image">
            <img src="logo512.png" class="user-image" alt="..." />
            <br />
            <button className="badge badge-primary"> Upload </button>
          </div>
          <div class="user__profile__details">{this.state.printdata}</div>
        </div>
      </div>
    );
  }
}

export default UserProfile;

/*


<div class="row">
        <div class="card col-sm-8">
          <div class="card" style={{ width: "28rem" }}>
            <div className="card-title">
              <h1 class="display-5">
                <span className="badge badge-dark"> My profile</span>
              </h1>
            </div>
            {this.state.printdata}
          </div>
          <div className="card-body-col-sm-7">
            <img
              class="card-img-top"
              src="logo512.png"
              alt="Profile Picture"
              style={{ height: "90px", width: "90px" }}
            />

            <h5 class="display-6">
              <span className="badge badge-dark">Profile Picture</span>
            </h5>
          </div>
        </div>
      </div>

      */
