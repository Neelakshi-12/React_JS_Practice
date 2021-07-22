import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { geolocated } from "react-geolocated";

import { firebase, db } from "./config/firebase";
require("firebase/auth");

// signup.js

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progess: {
    position: "absolute",
  },
});
// signup.js

class Signup extends Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      ready: false,
      where: { lat: null, lng: null },
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    // if ("geolocation" in navigator) {
    //   console.log("Location Available");
    // } else {
    //   console.log("Location Not Available");
    // }
    // // navigator.geolocation.getCurrentPosition(
    // //   function (position) {
    // //     console.log("The User Latitude is :", position.coords.latitude);
    // //     console.log("The User Longitude is :", position.coords.longitude);
    // //     console.log(position);
    // //   },
    // //   function (error) {
    // //     console.error("Error Message = " + error.code + " - " + error.message);
    // //   }
    // // );
    // if (navigator.geolocation) {
    //   navigator.geolocation.watchPosition(function (position) {
    //     console.log("The User Latitude is :", position.coords.latitude);
    //     console.log("The User Longitude is :", position.coords.longitude);
    //   });
    // }
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    this.setState({ ready: false, error: null });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }
  geoSuccess = (position) => {
    console.log(position.coords.latitude);

    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
  };
  geoFailure = (err) => {
    this.setState({ error: err.message });
  };

  signup(e) {
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log(response);
        let uid = firebase.auth().currentUser.uid;
        db.collection("Users")
          .add({
            id: uid,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            country: this.state.country,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            latitude: this.state.where.lat,
            longitude: this.state.where.lng,
          })
          .then(() => {
            console.log("User added!");
            alert("User Registered Successfully!!");
          });
        console.log("User account created & signed in!");
        alert("User account created & signed in!!");
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <div>
            {!this.state.ready && <h2>Using Geolocation in React Native.</h2>}
            {this.state.error && <h2>{this.state.error}</h2>}
            {this.state.ready && (
              <h2>{`Latitude: ${this.state.where.lat}
                    Longitude: ${this.state.where.lng}`}</h2>
            )}
          </div> */}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* <TextField
                type="email"
                name="email"
                id="email"
                label="Email"
                style={{ margin: 8 }}
                placeholder="abc@gmail.com"
                helperText="Enter a Valid Email-Address!"
                fullWidth
                onChange={this.handleChange}
                value={this.state.email}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              /> */}

                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  margin="normal"
                  autoComplete="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  autoComplete="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={this.state.phoneNumber}
                  pattern="[7-9]{1}[0-9]{9}"
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.email}
                  autoComplete="email"
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  value={this.state.country}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={this.signup}
              disabled={
                loading ||
                !this.state.email ||
                !this.state.password ||
                !this.state.firstName ||
                !this.state.lastName ||
                !this.state.country ||
                !this.state.username ||
                !this.state.phoneNumber
              }
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progess} />
              )}
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Signup);
