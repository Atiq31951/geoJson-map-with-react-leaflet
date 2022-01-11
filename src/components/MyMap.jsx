import React, { Component, createRef } from "react";
import MunicipalityData from "./../data/sweden-municipalities.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import MuniMap from "./MuniMap";
import CountiesMap from "./CountiesMap";
class MyMap extends Component {
  state = { color: "#ffff00", zoom: 4 };

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

    layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
    // const colorIndex = Math.floor(Math.random() * this.colors.length);
    // layer.options.fillColor = this.colors[colorIndex]; //0

    layer.on({
      click: this.changeCountryColor,
    });
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  getMap = () => {
    const { zoom } = this.state;

    if (zoom < 6) {
      console.log("🚀 ~ file: MyMap.jsx ~ line 58 ~ MyMap ~ zoom", zoom);
      return (
        <MuniMap
          zoom={zoom}
          changeState={(zoomValue) => {
            console.log("zoomValue", zoomValue);
            this.setState({ zoom: zoomValue });
          }}
        />
      );
    }
    return (
      <CountiesMap
        zoom={zoom}
        changeState={(zoomValue) => {
          console.log("zoomValue", zoomValue);
          this.setState({ zoom: zoomValue });
        }}
      />
    );

    return null;
  };

  render() {
    if (MunicipalityData?.objects?.SWE_mun?.geometries) {
      var jsonDatas = MunicipalityData?.objects?.SWE_mun?.geometries;
      jsonDatas = jsonDatas.map(({ arcs, properties, type }) => ({
        type: "Feature",
        properties: {
          ADMIN: properties.NAME_2,
          ISO_A3: "ABW",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            arcs.reduce(
              (acc, curr) => [
                ...acc,
                ...(curr.reduce(
                  (acc, curr) => [
                    ...acc,
                    ...(MunicipalityData.arcs[curr] || []),
                  ],
                  []
                ) || []),
              ],
              []
            ),
          ],
        },
      }));
    }
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>My Map</h1>
        {this.getMap()}
      </div>
    );
  }
}

export default MyMap;
