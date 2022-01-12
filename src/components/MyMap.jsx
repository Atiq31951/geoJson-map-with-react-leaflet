import React, { Component, createRef } from "react";
import MunicipalityData from "./../data/sweden-municipalities.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import MuniMap from "./MuniMap";
import CountiesMap from "./CountiesMap";
class MyMap extends Component {
  state = {
    color: "#ffff00",
    zoom: 4,
    center: [59.350534130617085, 18.04155513004905],
  };

  colors = ["green", "blue", "yellow", "orange", "grey"];

  countryStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  map = createRef();

  printMesssageToConsole = (event) => {
    console.log("Clicked");
  };

  changeCountryColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: this.state.color,
      fillOpacity: 1,
    });
  };

  onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    console.log(countryName);
    layer.bindPopup(countryName);

    layer.options.fillOpacity = Math.random();

    layer.on({
      click: this.changeCountryColor,
    });
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  getMap = () => {
    const { zoom, center } = this.state;

    if (zoom < 6) {
      return (
        <MuniMap
          zoom={zoom}
          center={center}
          changeState={({ zoom, center }) => {
            if (zoom) {
              this.setState({ zoom: zoom });
            }
            if (center) {
              this.setState({ center: center });
            }
          }}
        />
      );
    }
    return (
      <CountiesMap
        zoom={zoom}
        center={center}
        changeState={({ zoom, center }) => {
          this.setState({ zoom: zoom });
          if (center) {
            this.setState({ center: center });
          }
        }}
      />
    );
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>My Map</h1>
        {this.getMap()}
      </div>
    );
  }
}

export default MyMap;
