import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import * as actions from "../../store/actions/auth";
import InputComponent from "../../components/inputcomponent";
import PrimaryBtn from "../../components/primarybutton";

class LoginRow extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.username, this.state.password);
    console.log("props is ", this.props);
  };
  render() {
    let errorMessage = null;
    if (this.props.error) {
      console.log("true", this.props.error.message);
      errorMessage = <p>{" username or password is wrong try again"}</p>;
    }
    return (
      <Row className="mx-4 login-col-row">
        <Container>
          <Row>
            <Col className="align-items-center">
              <h4>Login</h4>
            </Col>
          </Row>
          {errorMessage}
          {this.props.loading ? (
            <div class="spinner-border m-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <InputComponent
                className="input-text"
                type="email"
                placeholder="Email"
                name="username"
                onChange={(e) =>
                  this.setState({ username: e.target.value.toString() })
                }
              />

              <InputComponent
                className="input-text"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />

              <PrimaryBtn
                className="primary-btn"
                type="submit"
                btnName="Login"
              />
              <a href="/user/register" className="badge badge-primary">
                Register
              </a>
            </form>
          )}
        </Container>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => {
      dispatch(actions.authLogin(username, password));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginRow);
