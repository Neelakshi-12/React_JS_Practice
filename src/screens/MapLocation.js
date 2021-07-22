import React, { Component } from "react";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { firebase, db } from "./config/firebase";
require("firebase/auth");

const mapStyles = {
  width: "100%",
  height: "100%",
};

class MapLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
    };
  }

  componentDidMount() {
    db.collection("Users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          console.log("firstName", documentSnapshot.data().firstName);
          console.log("email", documentSnapshot.data().email);
          console.log("latitude", documentSnapshot.data().latitude);
          console.log("longitude", documentSnapshot.data().longitude);
          console.log("phoneNumber", documentSnapshot.data().phoneNumber);
          console.log(
            "firebase.auth().currentUser.uid",
            firebase.auth().currentUser.uid
          );
          this.setState({
            latitude: documentSnapshot.data().latitude,
            longitude: documentSnapshot.data().longitude,
          });
          console.log("this.state.latitude", this.state.latitude);
          console.log("this.state.longitude", this.state.longitude);
        });
      });
  }
  logout() {
    firebase.auth().signOut();
  }
  render() {
    return (
      <div>
        <h1>You are Logged in!!</h1>
        <button onClick={this.logout}>Logout</button>
        <div>
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat: this.state.latitude,
              lng: this.state.longitude,
            }}
          >
            <Marker onClick={this.onMarkerClick} name={"This is test name"} />
          </Map>
        </div>
        );
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBNm1hJGXlRi3AzRSFTkvvzt0xFTLNntMk",
})(MapLocation);
