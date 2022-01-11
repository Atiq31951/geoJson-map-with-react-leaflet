import React, { Component, createRef } from "react";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./../data/countries.json";
import MunicipalityData from "./../data/sweden-municipalities.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends Component {
  state = { color: "#ffff00" };

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


  getMapZoom() {
    return this.map && this.map?.leafletElement?.getZoom();
 }
  render() {
    console.log("getMapZoom", this.getMapZoom());
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
                  (acc, curr) => [...acc, ...(MunicipalityData.arcs[curr]|| [])],
                  []
                ) || []),
              ],
              []
            ),
          ],
        },
      }));
    }

    console.log("jsonDatas", jsonDatas);
    console.log("jsonDatas", mapData);
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>My Map</h1>
        <Map ref={(ref) => this.map = ref} style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
          <GeoJSON
            style={this.countryStyle}
            data={mapData.provinces.features}
            onEachFeature={this.onEachCountry}
          />
        </Map>
        <input
          type="color"
          value={this.state.color}
          onChange={this.colorChange}
        />
      </div>
    );
  }
}

export default MyMap;
