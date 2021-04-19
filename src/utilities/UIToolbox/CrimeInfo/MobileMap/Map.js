/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: CrimeMap.js
 * Created: Thursday, 8th April 2021 4:06:52 am
 * Modified: Thursday, 8th April 2021 4:18:30 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { NightScale, GrayScale, LightGray, DarkScale, BlueScale } from "./MapStyles";
import { Button } from "@material-ui/core";

// const google = window.google;
const google = window.google ? window.google : {};

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.gMap = {};
    this.eventMarkers = [];
    this.heatmap = null;
    this.data = [];

    window.MessageDispatcher.SubscribeDispatcher(
      "CrimeMobileMap",
      this.handleDispatchMessage
    );
  }

  handleDispatchMessage = (param) => {
    var self = this;

    if (param.Receiver == "CRIME_MOBILE_MAP") {
      switch (param.Command) {
        case "PLOT_REPORT_SYMBOLS":
          this.data = param.Data;
          for (var i = 0; i < param.Data.length; i++) {
            this.plotMarkers(param.Data[i]);
          }
          break;
        case "ZOOM_TO_LOCATION":
          let latLng = new google.maps.LatLng(param.Data.Latitude, param.Data.Longitude);
          this.gMap.panTo(latLng);
          this.gMap.setZoom(param.Data.Zoom);
          break;
      }
    }
  };

  componentDidMount() {
    this.gMap = this.createMap();

    // Location
    google.maps.event.addListener(this.gMap, "click", function (event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      console.log(lat + "," + lng);
    });

    // Current Map Center and Zoom level
    var self = this;
    google.maps.event.addListener(this.gMap, "center_changed", function () {
      var c = self.map.getCenter();
      console.log(c.lat() + "," + c.lng() + "," + self.map.getZoom());
    });
  }

  createHeatMap() {
    if (this.heatmap != null) {
      // Clear previous heatmap
      if (this.heatmap != null) {
        this.heatmap.setMap(null);
        this.heatmap = null;
      }

      for (var i = 0; i < this.data.length; i++) {
        this.plotMarkers(this.data[i]);
      }
    } else {
      var points = [];
      for (var i = 0; i < this.data.length; i++) {
        points.push(
          new google.maps.LatLng(this.data[i].Latitude, this.data[i].Longitude)
        );
      }
      var filteredData = points;

      // Remove all markers
      for (var i = 0; i < this.eventMarkers.length; i++) {
        this.eventMarkers[i].setMap(null);
      }
      this.eventMarkers = [];

      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: filteredData,
        map: this.gMap,
      });
      this.heatmap.set("radius", 30);
      this.heatmap.set("opacity", 0.7);
    }
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

  plotMarkers(data) {
    var icon = {
      url: `img/markers/patrol/${data.ReportTypeName}.png`,
      scaledSize: new google.maps.Size(32, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 20),
      labelOrigin: new google.maps.Point(16, -10),
    };

    var marker = new google.maps.Marker({
      position: { lat: data.Latitude, lng: data.Longitude },
      map: this.gMap,
      icon: icon,
      zIndex: 1,
      label: {
        text: data.ReportTypeName,
        color: data.ReportColor,
        fontSize: "12px",
        fontWeight: "bold",
      },
    });

    var content =
      '<div id="MapInfoWindow" style="color:black;font-size: 90%;width:200px"  >' +
      '<h2 style="color:black;font-size: 100%" >' +
      data.ReportTypeName +
      "</h2>" +
      "<table>" +
      "<tr>" +
      "<td>Time</td>" +
      "<td>" +
      data.CreatedDateTime +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Location</td>" +
      "<td>" +
      data.Location +
      "</td>" +
      "</tr>" +
      "</table>" +
      '<img src="' +
      data.MediaLink +
      '" width="100%" height="auto" object-fit="contain"/>' +
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
      // top: this.props.marginTop + 10,
      // left: this.props.marginLeft + 30,
      margin: 0,
      height: this.props.height,
      width: this.props.width,
      overflow: "hidden",
      backgroundColor: "gray",
    };

    return (
      <div>
        <div className="GMap">
          <div style={divStyle} className="GMap-canvas" ref="patrolMap"></div>
        </div>
        <div
          style={{
            position: "relative",
            left: 5,
            top: 5,
          }}
        >
          <Button
            onClick={() => this.createHeatMap()}
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
