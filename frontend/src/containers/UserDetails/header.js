import React, { Component } from "react";

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/UserDetails/css/Header.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbar bg="dark" expand="lg">
        <Link to="/">
          <Navbar.Brand className="fontWhite">Coding Judge</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/contests" className="fontWhite ml-3">
              Contests
            </Link>
            <Link to="/problems" className="fontWhite ml-3">
              Problems
            </Link>
            <Link to="/ide" className="fontWhite ml-3">
              IDE
            </Link>
          </Nav>

          {this.props.isAuthenticated ? (
            <Nav>
              <Link to="/submissions" className="fontWhite ml-3">
                Submissions
              </Link>
              <Link
                to="/user/login"
                className="fontWhite ml-3"
                onClick={this.props.logout}
              >
                Logout
              </Link>
              <Link to="/userprofile" className="fontWhite ml-3">
                <AccountCircleIcon />
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Link to="/user/login" className="fontWhite ml-3">
                Login
              </Link>
              <Link to="/user/register" className="fontWhite ml-3">
                Register
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Header);
