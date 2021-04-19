/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: Validation.js
 * Created: Wednesday, 28th October 2020 2:53:31 pm
 * Modified: Wednesday, 28th October 2020 2:53:31 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { createContext } from "react";

// components
import MapFunctions from "./MapFunctions";
import MapPlot from "./MapPlot";
import MapPatrol from "./MapPatrol";

// utilities
import Globals from "utilities/Globals";
import { GrayScale, LightGray, DarkScale, BlueScale } from "./MapStyles";

// 1
export const StateBinder = createContext(null);

let instance = null;
const google = window.google ? window.google : {};

export default class ViewState {
  constructor() {
    if (!instance) {
      this.isDisplayDistrictBoundary = true;
      this.isDisplayTraffic = false;
      this.isDisplayCamera = false;
      this.setMapRef = null;

      this.map = {};
      this.mapFunctions = {};
      this.mapPlot = {};
      this.mapParol = {};

      this.globals = new Globals();

      window.MessageDispatcher.SubscribeDispatcher(
        "Map",
        this.handleDispatchMessage
      );
      instance = this;
    }
    return instance;
  }

  initMapRef(mapRef) {
    this.setMapRef = mapRef;
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
          var param = { Receiver: "MAP_PLOT", Command: "CLEAR_ALL_ZONES" };
          this.msgDispatcher.TriggerMessageDispatcher(param);
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

  componentDidMount = () => {
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
  };

  createMap = () => {
    var mapOptions = {
      zoom: this.globals.districtZoom,
      center: this.globals.districtCenter,
      gestureHandling: "greedy",
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: false,
      styles: GrayScale,

      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
    };
    return new google.maps.Map(this.setMapRef, mapOptions);
  };

  initSetOpen = (state) => {
    this.setOpen = state;
  };

  showMap = () => {
    this.setOpen(true);
  };

  closeMap = () => {
    this.setOpen(false);
  };
}
