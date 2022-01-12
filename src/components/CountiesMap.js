import React, { Component, createRef } from "react";
import { Map, GeoJSON, ZoomControl } from "react-leaflet";
import mapData from "./../data/counties.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

function MuniMap({ zoom, changeState, center }) {
  return (
    <Map
      //   ref={(ref) => (this.map = ref)}
      style={{ height: "80vh" }}
      zoom={zoom}
      zoomControl={true}
      onZoomend={(event) => changeState({ zoom: event.target._animateToZoom })}
      onMoveEnd={(event) => {
        changeState({ center: event.target.boxZoom._map.dragging.lastPos });
      }}
      center={center}
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
