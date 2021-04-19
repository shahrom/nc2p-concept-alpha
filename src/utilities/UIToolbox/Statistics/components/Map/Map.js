/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: PatrolMap.js
 * Created: Sunday, 8th November 2020 11:23:39 am
 * Modified: Sunday, 8th November 2020 12:31:31 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import {
  NightScale,
  GrayScale,
  LightGray,
  DarkScale,
  BlueScale,
} from "./MapStyles";
import { Button } from "@material-ui/core";

// const google = window.google;
const google = window.google ? window.google : {};

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.gMap = {};
    this.mapFunctions = {};
    this.eventMarkers = [];
    this.heatmap = null;

    this.countVANDALISM = 0;
    this.countPOTHOLES = 0;
    this.countWASTE = 0;
  }

  componentDidMount() {
    this.gMap = this.createMap();
  }

  updateData(data) {
    if (data != null) {
      // Remove all markers
      for (var i = 0; i < this.eventMarkers.length; i++) {
        this.eventMarkers[i].setMap(null);
      }
      this.eventMarkers = [];

      var incidentList = data;

      this.countVANDALISM = 0;
      this.countPOTHOLES = 0;
      this.countWASTE = 0;

      for (var i = 0; i < incidentList.length; i++) {
        var item = {
          type: incidentList[i].IncidentTypeName,
          lat: incidentList[i].Lat,
          lng: incidentList[i].Lng,
          id: i,
          location: incidentList[i].IncidentLocation,
          time: incidentList[i].DispatchTime,
        };
        this.plotMarkers(item);
      }
    }

    if (this.props.displayHotspot == true) {
      var points = [];
      for (var i = 0; i < data.length; i++) {
        points.push(new google.maps.LatLng(data[i].Lat, data[i].Lng));
      }
      this.createHeatMap(points);
    } else {
      if (this.heatmap != null) {
        this.heatmap.setMap(null);
      }
    }
  }

  handleDefaultZoomCenter = () => {
    var self = this;
    self.setState({
      defaultZoomCenter: false,
    });
  };

  createHeatMap(filteredData) {
    // Remove all markers
    for (var i = 0; i < this.eventMarkers.length; i++) {
      this.eventMarkers[i].setMap(null);
    }
    this.eventMarkers = [];

    // Clear previous heatmap
    if (this.heatmap != null) {
      this.heatmap.setMap(null);
      this.heatmap = null;
    }

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: filteredData,
      map: this.gMap,
    });
    this.heatmap.set("radius", 30);
    this.heatmap.set("opacity", 0.7);
  }

  createMap() {
    var pos = { lat: 1.5482311356428538, lng: 110.40318736807339 };
    let mapOptions = {
      zoom: 13,
      center: pos,
      gestureHandling: "greedy",
      disableDefaultUI: true,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      zoomControl: false,
      styles: GrayScale,
    };
    return new google.maps.Map(this.refs.patrolMap, mapOptions);
  }

  plotMarkers(param) {
    switch (param.type.toUpperCase()) {
      case "VANDALISM":
        this.countVANDALISM++;
        break;

      case "POTHOLES":
        this.countPOTHOLES++;
        break;

      case "WASTE":
        this.countWASTE++;
        break;
    }

    if (param.type === "VANDALISM") {
      var icon = {
        url: "img/markers/purple_pulse.gif",
        scaledSize: new google.maps.Size(24, 24),
      };
    }

    if (param.type === "POTHOLES") {
      var icon = {
        url: "img/markers/red_pulse.gif",
        scaledSize: new google.maps.Size(24, 24),
      };
    }

    if (param.type === "WASTE") {
      var icon = {
        url: "img/markers/green_pulse.gif",
        scaledSize: new google.maps.Size(24, 24),
      };
    }
    var marker = new google.maps.Marker({
      position: { lat: param.lat, lng: param.lng },
      map: this.gMap,
      icon: icon,
      id: param.id,
      type: param.type,
      zIndex: 1,
    });

    var content =
      '<div id="MapInfoWindow" style="color:black;font-size: 90%;width:200px"  >' +
      '<h5 style="color:black;font-size: 100%" >' +
      param.type +
      "</h5>" +
      "<table>" +
      "<tr>" +
      "<td>Time</td>" +
      "<td>" +
      param.time +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Location</td>" +
      "<td>" +
      param.location +
      "</td>" +
      "</tr>" +
      "</table>" +
      "</div>";

    var info = new google.maps.InfoWindow();
    info.setContent(content);
    marker.info = info;

    google.maps.event.addListener(marker, "click", function () {
      marker.info.open(this.gMap, marker);
    });

    this.eventMarkers.push(marker);
  }

  render() {
    const divStyle = {
      position: "absolute",
      top: this.props.marginTop + 5,
      left: this.props.marginLeft + 30,
      height: this.props.height,
      width: this.props.width,
      overflow: "hidden",
      backgroundColor: "white",
    };

    return (
      <div>
        <div className="GMap" data={this.updateData(this.props.data)}>
          <div style={divStyle} className="GMap-canvas" ref="patrolMap"></div>
        </div>
        <div
          style={{
            position: "relative",
            left: 30,
            top: 0,
          }}
        >
          <Button
            onClick={this.props.handleHotspot}
            style={{
              width: 120,
              height: 42,
              color: "rgba(255,165,0,1)",
              backgroundColor: "rgba(255,165,0,0.1)",
              margin: "5px",
            }}
          >
            Hotspot
          </Button>
        </div>
      </div>
    );
  }
}
