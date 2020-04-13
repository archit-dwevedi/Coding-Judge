import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/UserDetails/css/login.css";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import InputComponent from "../../components/inputcomponent";
import PrimaryBtn from "../../components/primarybutton";

class RegisterRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      name: "",
      college: "",
      isRegisetered: false,
      errorMessage: "",
    };
  }

  handleChange = (e) => {
    const name = e.target.name.toString();
    const value = e.target.value.toString();
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleRegisterOnSubmit = (e) => {
    e.preventDefault();

    var data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      college: this.state.college,
      email: this.state.username,
    };

    Axios.post("http://127.0.0.1:8000/users/register/", data)
      .then((response) => {
        this.setState((prevstate) => {
          const newState = { ...prevstate };
          newState["isRegisetered"] = true;
          return newState;
        });
        console.log(response.status);
      })
      .catch((e) => {
        console.log(e.response);
        var response = JSON.parse(e.request.response);
        if (response["username"]) {
          console.log("Here");
          this.setState((prevstate) => {
            const newState = { ...prevstate };
            newState["errorMessage"] = response["username"];
            return newState;
          });
          console.log("Here", this.state.errorMessage);
        }
      });
  };

  render() {
    if (this.state.isRegisetered) {
      return (
        <p>
          <h2> User Registered</h2>
          <Redirect to="/user/login" />
        </p>
      );
    }
    return (
      <Row className="mx-4 register-col-row">
        <Container>
          <Row>
            <Col className="align-items-center">
              <h4>Register</h4>
            </Col>
          </Row>
          <form onSubmit={this.handleRegisterOnSubmit}>
            <InputComponent
              className="input-text"
              type="email"
              placeholder="Email"
              name="username"
              onChange={this.handleChange}
            />
            <p className="error">{this.state.errorMessage}</p>

            <InputComponent
              className="input-text"
              type="text"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
            />

            <InputComponent
              className="input-text"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />

            <InputComponent
              className="input-text"
              type="text"
              placeholder="College"
              name="college"
              onChange={this.handleChange}
            />

            <PrimaryBtn
              className="primary-btn"
              type="submit"
              btnName="Register"
            />
          </form>
          Already Registered{" "}
          <a href="/user/login " className="badge badge-primary">
            {" "}
            login
          </a>
        </Container>
      </Row>
    );
  }
}
export default RegisterRow;
