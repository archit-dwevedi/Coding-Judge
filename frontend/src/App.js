import React, { Component } from "react";
import "./App.css";
import "./assets/index/index.css";
import Header from "./containers/UserDetails/header";
import User from "./containers/UserDetails/user";
import IDE from "./containers/IDE/ide";
import Contests from "./containers/Contest/contest";
import ProblemList from "./containers/Problem/ProblemListView";
import ProblemDetail from "./containers/Problem/ProblemDetailView";
import HomePage from "./containers/HomePage/homepage";
import SubmissionListView from "./containers/Submission/SubmissionListView";
import Submit from "./components/SubmitComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import UserProfile from "./components/UserProfile";
import Code from "./components/Code";
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header {...this.props} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/user"
              render={(props) => (
                <User {...props} isAuthenticated={this.props.isAuthenticated} />
              )}
            />
            <Route path="/contests" component={Contests}></Route>
            <Route
              path="/problems"
              render={(props) => (
                <ProblemList
                  {...props}
                  isAuthenticated={this.props.isAuthenticated}
                />
              )}
            ></Route>
            <Route
              path="/problem/:problem_id"
              render={(props) => (
                <ProblemDetail
                  {...props}
                  isAuthenticated={this.props.isAuthenticated}
                />
              )}
            ></Route>

            {this.props.isAuthenticated ? (
              <div>
                <Route
                  path="/submission/:submission_id"
                  component={Code}
                ></Route>
                <Route path="/submit/:problem_id" component={Submit}></Route>
                <Route path="/userprofile" component={UserProfile}></Route>
                <Route
                  path="/submissions"
                  component={SubmissionListView}
                ></Route>
              </div>
            ) : (
              <p>Login Required</p>
            )}
            <Route path="/ide" component={IDE}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
