import React, { Component } from "react";
import "./App.css";
import Header from "./screens/Header";
import About from "./screens/About";
import { Footer } from "./screens/Footer";
import MainBody from "./screens/MainBody";
import ContactUs from "./screens/ContactUs";
import MoreInfo from "./screens/MoreInfo";
import MapLocation from "./screens/MapLocation";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { firebase, db } from "./screens/config/firebase";

require("firebase/auth");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
      <>
        <Router>
          <Header title="My Todos List" searchBar={false} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <>
                    <MainBody />
                  </>
                );
              }}
            ></Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <ContactUs />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/moreinfo">
              <MoreInfo />
            </Route>
            <Route exact path="/map">
              {this.state.user ? <MapLocation /> : <Login />}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}
