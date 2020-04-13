// Imports
import React, { Component } from "react";
import coder from "../../assets/UserDetails/img/coder.svg";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/UserDetails/css/login.css";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginRow from "./login";
import RegisterRow from "./register";
import HomePage from "../HomePage/homepage";

class User extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="login-row">
          <Col md={4} className="login-col align-self-center">
            <Switch>
              {this.props.isAuthenticated === true ? (
                <Route path="/user/register" component={HomePage} />
              ) : (
                <Route path="/user/register" component={RegisterRow} />
              )}
              {this.props.isAuthenticated === true ? (
                <Route path="/user/login" component={HomePage} />
              ) : (
                <Route
                  path="/user/login"
                  render={(props) => <LoginRow {...this.props} />}
                />
              )}
            </Switch>
          </Col>
          <Col md={8} className="align-self-end coder-col">
            <img src={coder} alt="Code" className="coder-svg" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default User;
