/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: Map.js
 * Created: Tuesday, 23rd February 2021 10:29:14 am
 * Modified: Tuesday, 2nd March 2021 10:47:47 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import MapFunctions from "./components/MapFunctions";
import MapPlot from "./components/MapPlot";
import MapPatrol from "./components/MapPatrol";

// utilities
import {
  GrayScale,
  LightGray,
  DarkScale,
  BlueScale,
} from "./components/MapStyles";

const google = window.google ? window.google : {};
export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.isDisplayDistrictBoundary = true;
    this.isDisplayTraffic = false;
    this.isDisplayCamera = false;

    this.mapId = props.id;

    this.map = {};
    this.mapFunctions = {};
    this.mapPlot = {};
    this.mapParol = {};

    window.MessageDispatcher.SubscribeDispatcher(
      "Map",
      this.handleDispatchMessage
    );
  }

  handleDispatchMessage = (param) => {
    var self = this;

    if (param.Receiver == "MAP") {
      switch (param.Command) {
        case "PLOT_COMPLAINT_SYMBOL":
          self.mapFunctions.PlotCircle(
            3.1384012259674905,
            101.67788255415871,
            1000,
            1
          );
          var itemData = {
            type: "inspection",
            lat: 3.1384012259674905,
            lng: 101.67788255415871,
            label: "REPORT-01",
            name: "CAM REPORT",
            icon: "inspection",
            id: 1,
          };
          self.mapPlot.PlotZoneReports(itemData);
          var point = { lat: 3.1384012259674905, lng: 101.67788255415871 };
          var zoom = 16;
          self.mapFunctions.ZoomToPoint(point, zoom);

          break;

        case "PLOT_DISPATCH_ROUTE":
          var origin = new google.maps.LatLng(
            3.1384012259674905,
            101.67788255415871
          );
          var destination = new google.maps.LatLng(
            param.Data.lat,
            param.Data.lng
          );

          self.mapPatrol.CalculateRoute(origin, destination, 5, 1);
          break;

        case "HOME":
          self.mapFunctions.CenterDefaultMap();
          var param = { Receiver: "MAP_PLOT", Command: "CLEAR_MAP" };
          window.MessageDispatcher.TriggerMessageDispatcher(param);
          break;

        case "BOUNDARY":
          self.isDisplayDistrictBoundary = !self.isDisplayDistrictBoundary;
          self.mapFunctions.DisplayDistrictBoundary(
            self.isDisplayDistrictBoundary
          );
          break;

        case "CAMERAS":
          self.isDisplayCamera = !self.isDisplayCamera;
          self.mapFunctions.DisplayCameraSymbol(self.isDisplayCamera);
          break;

        case "TRAFFIC":
          self.isDisplayTraffic = !self.isDisplayTraffic;
          self.mapFunctions.DisplayTrafficStatus(self.isDisplayTraffic);
          break;

        case "ZOOM_TO_LOCATION":
          var point = { lat: param.Data.Latitude, lng: param.Data.Longitude };
          var zoom = param.Data.Zoom;
          self.mapFunctions.ZoomToPoint(point, zoom);
          break;
      }
    }
  };

  componentDidMount() {
    this.map = this.createMap();
    this.mapFunctions = new MapFunctions(this.map);
    this.mapPlot = new MapPlot(this.map);
    this.mapPatrol = new MapPatrol(this.map);

    this.mapFunctions.DisplayDistrictBoundary(this.isDisplayDistrictBoundary);

    // Location
    google.maps.event.addListener(this.map, "click", function (event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      console.log(lat + "," + lng);
    });

    // Current Map Center and Zoom level
    var self = this;
    google.maps.event.addListener(this.map, "center_changed", function () {
      var c = self.map.getCenter();
      console.log(c.lat() + "," + c.lng() + "," + self.map.getZoom());
    });
  }

  createMap() {
    var pos = { lat: 1.5482311356428538, lng: 110.40318736807339 };
    var mapOptions = {
      zoom: 13,
      center: pos,
      gestureHandling: "greedy",
      zoomControl: false,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: GrayScale,

      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
    };
    return new google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  handleGenericClick(e) {
    switch (e.target.title) {
      case "PatrolInfo":
        // 1. Open the UnitInfo
        // 2. Hide ZoneInfo
        var dataString = e.target.name.split(";");
        var callSign = dataString[1].split("|")[1];

        var param = {
          Receiver: "DRAWER_USER_PROFILE",
          Command: "CALLSIGN",
          Data: callSign,
        };
        window.MessageDispatcher.TriggerMessageDispatcher(param);

        window.ViewStateManager.displayUnitInfo();
        break;
    }
  }

  render() {
    const divStyle = {
      zIndex: "1",
      position: "absolute",
      top: 0,
      left: 0,
      height: this.props.height,
      width: this.props.width,
      overflow: "hidden",
      backgroundColor: "white",
      marginTop: -5,
    };

    return (
      <div onClick={this.handleGenericClick.bind(this)}>
        <div className="GMap">
          <div style={divStyle} className="GMap-canvas" ref="mapCanvas"></div>
        </div>
      </div>
    );
  }
}
