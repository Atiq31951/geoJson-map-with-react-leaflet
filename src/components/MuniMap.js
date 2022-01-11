import React, { Component, createRef } from "react";
import { Map, GeoJSON, ZoomControl } from "react-leaflet";
import mapData from "./../data/municipalities.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

function MuniMap({ zoom, changeState }) {
  return (
    <Map
      style={{ height: "80vh" }}
      zoom={zoom}
      zoomControl={true}
      onZoomend={(event) => changeState(event.target._animateToZoom)}
      center={[59.350534130617085, 18.04155513004905]}
    >
      <GeoJSON
        // style={this.countryStyle}
        data={mapData.features}
        // onEachFeature={this.onEachCountry}
      />
    </Map>
  );
}

export default MuniMap;
