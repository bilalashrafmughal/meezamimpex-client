import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Home/home.css";
import "./Components/Cart/cart.css";

// IMPORTING MEDIA QUERIES

import "./Components/BPQueries/bp1200.css";
import "./Components/BPQueries/bp1024.css";
import "./Components/BPQueries/bp900.css";
import "./Components/BPQueries/bp768.css";
import "./Components/BPQueries/bp480.css";
import "./Components/BPQueries/bp320.css";

import Router from "./Router";
import { isAuthenticated } from "./shared/helpers";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
} from "./Components/ReducersActions/Actions";

class App extends Component {
  render() {
    const auth = isAuthenticated();
    this.props.loginMethod(auth.jwt);
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginMethod: (auth) => dispatch(loginAction(auth)),
    logutMethod: () => dispatch(logoutAction()),
  };
};

export default connect(null, mapDispatchToProps)(App);
