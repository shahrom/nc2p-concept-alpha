/*
 * --------------------------------------------------------------------
 * Project: LCAD
 * Version: 0.1.1
 * File: Mapbox.js
 * Created: Tuesday, 10th March 2020 11:11:49 am
 * Modified: Tuesday, 10th March 2020 11:48:12 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// Local
import MessageDispatcher from "utilities/MessageDispatcher";
import MapData from "./components/MapData";
import PatrolData from "./components/PatrolData";
import RiverData from "./components/RiverData";
import CCTVData from "./components/CCTVData";
import MPSJCCTVData from "./components/MPSJCCTVData";

import RobberyScenarioData from "./components/RobberyScenarioData";
import DetectionScenarioData from "./components/DetectionScenarioData";
import FireScenarioData from "./components/FireScenarioData";
import CommunityScenarioData from "./components/CommunityScenarioData";
import PanicButtonScenarioData from "./components/PanicButtonScenarioData";

import MapFunctions from "./components/MapFunctions";

// Declare mapboxgl
const mapboxgl = window.mapboxgl ? window.mapboxgl : {};

export default class Mapbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      desktopWidth: "100vw",
      desktopHeight: "100vh",
      zoom: [13.3],
      minZoom: [8],
      maxZoom: [20],
      bearing: [0],
      pitch: [0],
      center: [110.36345156824018, 1.5516844612297758],
    };

    this.fzoom = 18;
    this.fbearing = -60;
    this.fpitch = 60;

    this.map = {};
    this.mapData = new MapData();
    this.patrolData = new PatrolData();
    this.riverData = new RiverData();
    this.cctvData = new CCTVData();
    this.mpsjCCTVData = new MPSJCCTVData();
    this.flying = false;

    this.robberyScenarioData = new RobberyScenarioData();
    this.detectionScenarioData = new DetectionScenarioData();
    this.fireScenarioData = new FireScenarioData();
    this.communityScenarioData = new CommunityScenarioData();
    this.panicButtonScenarioData = new PanicButtonScenarioData();

    window.MessageDispatcher.SubscribeDispatcher("MapBox", this.handleDispatchMessage);
  }

  handleDispatchMessage = (param) => {
    var self = this;

    if (param.Receiver == "MAPBOX") {
      switch (param.Command) {
        case "ZOOM_TO_DEFAULT_LOCATION":
          var start = [110.36345156824018, 1.5516844612297758];
          this.fzoom = 13.3;
          this.fbearing = 0;
          this.fpitch = 0;
          self.flyTo(start);
          break;

        case "ZOOM_TO_ROBBERY":
          var start = [110.36008442555351, 1.55548005312097];
          this.fzoom = 18;
          this.fbearing = 80;
          this.fpitch = 45;
          self.flyTo(start);
          break;
        case "ZOOM_TO_FR":
          var start = [110.351391, 1.557934];
          this.fzoom = 17;
          this.fbearing = 0;
          this.fpitch = 45;
          self.flyTo(start);
          break;
        case "ZOOM_TO_FIRE":
          var start = [110.40584560736716, 1.562715014203927];
          this.fzoom = 17.5;
          this.fbearing = 0;
          this.fpitch = 0;
          self.flyTo(start);
          break;
        case "ZOOM_TO_COMMUNITY":
          var start = [110.34905383241414, 1.5539814848752393];
          this.fzoom = 18;
          this.fbearing = 90;
          this.fpitch = 10;
          self.flyTo(start);
          break;
        case "ZOOM_TO_PANICBUTTON":
          var start = [110.35429870887174, 1.5582700042711122];
          this.fzoom = 18;
          this.fbearing = 0;
          this.fpitch = 20;
          self.flyTo(start);
          break;
        case "ZOOM_TO_SENSORS":
          var start = [110.367506879872, 1.5552164185648067];
          this.fzoom = 17;
          this.fbearing = 30;
          this.fpitch = 30;
          self.flyTo(start);
          break;
      }
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.initMap();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      height: newProps.height,
      width: newProps.width,
    });

    this.resize();
    this.map.resize();

    var self = this;
    setTimeout(function () {
      self.setState({
        height: newProps.height,
        width: newProps.width,
      });

      self.resize();
      self.map.resize();
    }, 100);
  }

  resize() {
    this.setState({ desktopWidth: this.props.width });
    this.setState({ desktopHeight: this.props.height });
  }

  initMap() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2hhaHJvbWF6bWkiLCJhIjoiY2lzdTByYTc4MDB5bjJzcWdranhwYWRlZyJ9._Zns41TJ66ewiny71EXXLA";
    this.map = new mapboxgl.Map({
      container: "map",
      // style: "mapbox://styles/mapbox/streets-v10",
      // style: "mapbox://styles/mapbox/dark-v9",
      style: "mapbox://styles/mapbox/satellite-v9",
      zoom: this.state.zoom,
      center: this.state.center,
      pitch: this.state.pitch,
      bearing: this.state.bearing,
    });

    this.map.resize();

    // Controls ==========
    // var nav = new mapboxgl.NavigationControl();
    // this.map.addControl(nav, "top-left");
    // this.map.addControl(new mapboxgl.FullscreenControl());

    // Start Plotting when Map loads =========
    var self = this;

    this.map.on("load", function () {
      // Markers ==========
      self.plot3DBuilding();
      self.plotMarker("patrol", self.patrolData.getMPVData());
      self.plotMarker("riverSensors", self.riverData.getSensorData());
      self.plotMarker("cctv", self.cctvData.getCCTVData());
      self.plotMarker("mpsjcctv", self.mpsjCCTVData.getCCTVData());
      self.plotMarker("robbery", self.robberyScenarioData.getPoints());
      self.plotMarker("detection", self.detectionScenarioData.getPoints());
      self.plotMarker("fire", self.fireScenarioData.getPoints());
      self.plotMarker("community", self.communityScenarioData.getPoints());
      self.plotMarker("panicButton", self.panicButtonScenarioData.getPoints());

      // Fire Route ==========
      this.mapFunc = new MapFunctions(self.map);
      this.mapFunc.loadDistrictBoundary();

      // self.rotateCamera(1);
    });
  }

  flyTo(target) {
    this.map.flyTo({
      center: target,
      bearing: this.fbearing,
      pitch: this.fpitch,
      zoom: this.fzoom,
    });
  }

  rotateCamera() {
    var self = this;
    var count = 1;
    var mainTimer = setInterval(function () {
      self.map.rotateTo(((count++ * 5) / 100) % 360, { duration: 0 });
    }, 200);
  }

  addImage() {
    this.map.addLayer({
      id: "overlay",
      source: {
        type: "image",
        url: "img/logo/sbox_logo.png",
        coordinates: [
          [101.69765, 3.146148],
          [101.697636, 3.145495],
          [101.698385, 3.145476],
          [101.698396, 3.146156],
        ],
      },
      type: "raster",
      paint: { "raster-opacity": 0.9 },
      height: -532,
      base_height: -500,
    });
  }

  floorPlan() {
    this.map.addLayer({
      id: "room-extrusion",
      type: "fill-extrusion",
      // 'filter': ['==', 'level', 4],
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: this.mapData.getBuildingData(),
        },
      },

      // 'source': {
      //     'type': 'geojson',
      //     // 'data': 'https://www.mapbox.com/mapbox-gl-js/assets/data/indoor-3d-map.geojson'
      //     'data': 'indoor-3d-map.geojson'
      // },

      paint: {
        // See the Mapbox Style Specification for details on data expressions.
        // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions

        // Get the fill-extrusion-color from the source 'color' property.
        "fill-extrusion-color": ["get", "color"],

        // Get fill-extrusion-height from the source 'height' property.
        "fill-extrusion-height": ["get", "height"],

        // Get fill-extrusion-base from the source 'base_height' property.
        "fill-extrusion-base": ["get", "base_height"],

        // Make extrusions slightly opaque for see through indoor walls.
        "fill-extrusion-opacity": 1,
      },
    });
  }

  plotMarker2() {
    var el = document.createElement("div");
    el.className = "mpv";

    var info = {
      type: "Feature",
      properties: {
        title: "X1",
        description: "Single Marker",
      },
      geometry: {
        type: "Point",
        coordinates: [103.857465, 1.287939],
      },
    };

    var marker = new mapboxgl.Marker(el, {
      offset: [0, 0],
    })
      .setLngLat(info.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            "<h3>" +
              info.properties.title +
              '</h3><p style={{width:"300px"}}>' +
              info.properties.description +
              "</p>"
          )
      )
      .addTo(this.map);
  }

  plotPopUp() {
    var markerHeight = 50,
      markerRadius = 10,
      linearOffset = 25;
    var popupOffsets = {
      top: [0, 0],
      "top-left": [0, 0],
      "top-right": [0, 0],
      bottom: [0, -markerHeight],
      "bottom-left": [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      "bottom-right": [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      left: [markerRadius, (markerHeight - markerRadius) * -1],
      right: [-markerRadius, (markerHeight - markerRadius) * -1],
    };
    var popup = new mapboxgl.Popup({ offset: popupOffsets })
      .setLngLat([103.852465, 1.284939])
      .setHTML("<h1>Hello World!</h1>")
      .addTo(this.map);
  }

  loadMarkers() {
    var self = this;

    var geojson = this.mapData.getMPV();
    geojson.forEach(function (marker) {
      var el = document.createElement("div");
      el.className = marker.properties.class;
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h3>" +
              marker.properties.title +
              '</h3><p style={{width:"300px"}}>' +
              marker.properties.description +
              "</p>"
          )
        )
        .addTo(self.map);
    });
  }

  plot3DBuilding() {
    this.map.addLayer({
      id: "3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",

        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    });
  }

  plotMarker(id, list) {
    var self = this;

    this.map.addLayer({
      id: id,
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: list,
        },
      },
      layout: {
        visibility: "visible",
        "text-field": "{title}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, -3],
        "text-anchor": "top",
      },
    });

    var geojson = list;
    geojson.forEach(function (marker) {
      if (id === "patrol") {
        var content = self.getPatrolInfo(
          marker.properties.title,
          marker.properties.status,
          marker.properties.speed,
          "North",
          marker.geometry.coordinates
        );
      }
      if (id === "panicButton") {
        content = self.getPanicButtonInfo(
          marker.properties.title,
          "ACTIVATED",
          "Sekolah Kebangsaan Taman Kosas, Jalan Kosas 3/9, Taman Kosas, 68000 Ampang, Selangor",
          marker.geometry.coordinates
        );
      }
      if (id === "riverSensors") {
        content = self.getSensorInfo(
          marker.properties.title,
          "ACTIVE",
          "ACTIVATED",
          marker.properties.height,
          marker.geometry.coordinates
        );
      }
      if (id === "cctv") {
        content = self.getCCTVInfo(
          marker.properties.title,
          "ACTIVE",
          "None",
          marker.geometry.coordinates
        );
      }
      if (id === "robbery") {
        content = self.getRobberyInfo(
          marker.properties.title,
          "ROBBERY",
          "None",
          marker.geometry.coordinates
        );
      }
      if (id === "detection") {
        content = self.getBlackListInfo(
          marker.properties.title,
          "BLACK LIST DETECTION",
          "None",
          marker.geometry.coordinates
        );
      }
      if (id === "fire") {
        content = self.getFireInfo(
          marker.properties.title,
          "FIRE",
          "None",
          marker.geometry.coordinates
        );
      }
      if (id === "community") {
        content = self.getReportInfo(
          marker.properties.title,
          "PUBLIC REPORT",
          "None",
          marker.geometry.coordinates
        );
      }

      // The className is the marker icon
      var el = document.createElement("div");
      el.className = marker.properties.class;

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(content))
        .addTo(self.map);
    });
  }

  plotScenario(id, list) {
    this.map.addLayer({
      id: id,
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: list,
        },
      },
      layout: {
        visibility: "none",
        "text-field": "{title}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, -3],
        "text-anchor": "top",
      },
    });

    // var geojson = list;

    // });
  }

  getPanicButtonInfo(callSign, status, location, position) {
    var content =
      '<div id="MapInfoWindow">' +
      '<h4 style="color:red">' +
      callSign +
      "</h4>" +
      "<table>" +
      "<tr>" +
      "<td>Status</td>" +
      "<td>" +
      status +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Location</td>" +
      "<td>" +
      location +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Lat/Long</td>" +
      '<td style="color:blue;font-size: 100%;"><span>' +
      position[1].toFixed(4) +
      "</span>, <span>" +
      position[0].toFixed(4) +
      "</span></td>" +
      "</tr>" +
      "</table>" +
      "<br/>" +
      '<button style="color:blue;" title="PanicInfo" name="' +
      callSign +
      '" onclick="">More...</button>' +
      "</div>";

    return content;
  }

  getSensorInfo(callSign, status, alarm, height, position) {
    var content =
      '<div id="MapInfoWindow">' +
      '<h4 style="color:#002C9C">' +
      callSign +
      "</h4>" +
      "<table>" +
      "<tr>" +
      "<td>Status</td>" +
      "<td id=" +
      callSign +
      '_status style="color:blue;font-size: 100%;">' +
      status +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Water Quality</td>" +
      "<td id=" +
      callSign +
      '_height style="color:blue;font-size: 100%;">BAD (Excess Polution)</td>' +
      "</tr>" +
      "<tr>" +
      "<td>Alarm</td>" +
      "<td><div  id=" +
      callSign +
      '_course style="color:blue;font-size: 100%;">' +
      alarm +
      "</div></td>" +
      "</tr>" +
      "<tr>" +
      "<td>Lat/Long</td>" +
      '<td style="color:blue;font-size: 100%;"><span>' +
      position[1].toFixed(4) +
      "</span>, <span>" +
      position[0].toFixed(4) +
      "</span></td>" +
      "</tr>" +
      "</table>" +
      "<br/>" +
      '<button style="color:blue;" title="SensorInfo" name="' +
      callSign +
      '" onclick="">More...</button>' +
      "</div>";

    return content;
  }

  getCCTVInfo(callSign, status, alarm, position) {
    var content =
      '<div id="MapInfoWindow" style="width:250px">' +
      '<h4 style="color:#002C9C">' +
      callSign +
      "</h4>" +
      "<table>" +
      "<tr>" +
      "<td>Status</td>" +
      '<td style="color:blue;font-size: 100%;">' +
      status +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Alarm</td>" +
      '<td><div style="color:blue;font-size: 100%;">' +
      alarm +
      "</div></td>" +
      "</tr>" +
      "<tr>" +
      "<td>Lat/Long</td>" +
      '<td style="color:blue;font-size: 100%;"><span>' +
      position[1].toFixed(4) +
      "</span>, <span>" +
      position[0].toFixed(4) +
      "</span></td>" +
      "</tr>" +
      "</table>" +
      "<br/>" +
      '<button style="color:blue;" title="CCTVInfo" name="' +
      callSign +
      '" onclick="">More...</button>' +
      "</div>";

    return content;
  }

  getRobberyInfo(callSign, status, alarm, position) {
    var content =
      '<div id="MapInfoWindow" style="width:250px">' +
      '<h4 style="color:red">ENFORCEMENT</h4>' +
      "<table>" +
      "<tr>" +
      "<td>LOCATION</td>" +
      '<td style="color:blue;font-size: 100%;">JALAN WAWASAN 2/7</td>' +
      "</tr>" +
      "<tr>" +
      "<td>Status</td>" +
      '<td><div style="color:blue;font-size: 100%;">ENFORCERMENT AT SCENE</div></td>' +
      "</tr>" +
      "<tr>" +
      "<td>Lat/Long</td>" +
      '<td style="color:blue;font-size: 100%;"><span>' +
      position[1].toFixed(4) +
      "</span>, <span>" +
      position[0].toFixed(4) +
      "</span></td>" +
      "</tr>" +
      "</table>" +
      "<br/>" +
      '<button style="color:blue;" title="RobberyInfo" name="' +
      callSign +
      '" onclick="">More...</button>' +
      "</div>";

    return content;
  }

  getBlackListInfo(callSign, status, alarm, position) {
    var content =
      '<div id="MapInfoWindow" style="width:250px">' +
      '<h4 style="color:red">' +
      callSign +
      "</h4>" +
      "<table>" +
      "<tr>" +
      "<td>DETECTION TYPE</td>" +
      '<td style="color:blue;font-size: 100%;">FACIAL RECOGNITION</td>' +
      "</tr>" +
      "<tr>" +
      "<td>STATUS</td>" +
      '<td><div style="color:blue;font-size: 100%;">BLACK LIST DETECTION</div></td>' +
      "</tr>" +
      "<tr>" +
      "<td>LOCATION</td>" +
      '<td><div style="color:blue;font-size: 100%;">AMPANG POINT</div></td>' +
      "</tr>" +
      "<tr>" +
      "<td>Lat/Long</td>" +
      '<td style="color:blue;font-size: 100%;"><span>' +
      position[1].toFixed(4) +
      "</span>, <span>" +
      position[0].toFixed(4) +
      "</span></td>" +
      "</tr>" +
      "</table>" +
      "<br/>" +
      '<button style="color:blue;" title="DetectionInfo" name="' +
      callSign +
      '" onclick="">More...</button>' +
      "</div>";

    return content;
  }

  getFireInfo(callSign, status, alarm, position) {
    var content =
      '<div id="MapInfoWindow" style="width:300px">' +
      '<h4 style="color:red">' +
      callSign +
      "</h4>" +
      "<table>" +
      "<tr>" +
      "<td>INCIDENT TYPE</td>" +
      '<td style="color:blue;font-size: 100%;">' +
      status +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>LOCATION</td>" +
      '<td><div style="color:blue;font-size: 100%;">Pandan Puteri Condominium, Pandan Indah 56100 Ampang Selangor</div></td>' +
      "</tr>" +
      "<tr>" +
      "<td>STATUS</td>" +
      '<td><div style="color:blue;font-size: 100%;">EN-ROUTE</div></td>' +
      "</tr>" +
      "<tr>" +
      "<td>Lat/Long</td>" +
      '<td style="color:blue;font-size: 100%;"><span>' +
      position[1].toFixed(4) +
      "</span>, <span>" +
      position[0].toFixed(4) +
      "</span></td>" +
      "</tr>" +
      "</table>" +
      "<br/>" +
      '<button style="color:blue;" title="FireInfo" name="' +
      callSign +
      '" onclick="">More...</button>' +
      "</div>";

    return content;
  }

  getReportInfo(callSign, status, alarm, position) {
    var content =
      '<div id="MapInfoWindow" style="width:250px">' +
      '<h4 style="color:red">' +
      callSign +
      "</h4>" +
      "<table>" +
      "<tr>" +
      "<td>REPORT TYPE</td>" +
      '<td style="color:blue;font-size: 100%;">ILLEGAL GAMBLING</td>' +
      "</tr>" +
      "<tr>" +
      "<td>Location</td>" +
      '<td><div style="color:blue;font-size: 100%;">Ampang Damai Condominium, 8a, Jalan Wawasan 3, Bandar Baru Ampang, 68000 Ampang, Selangor</div></td>' +
      "</tr>" +
      "<tr>" +
      "<td>Lat/Long</td>" +
      '<td style="color:blue;font-size: 100%;"><span>' +
      position[1].toFixed(4) +
      "</span>, <span>" +
      position[0].toFixed(4) +
      "</span></td>" +
      "</tr>" +
      "</table>" +
      "<br/>" +
      '<button style="color:blue;" title="ReportInfo" name="' +
      callSign +
      '" onclick="">More...</button>' +
      "</div>";

    return content;
  }

  getPatrolInfo(callSign, status, speed, course, position) {
    var content =
      '<div id="MapInfoWindow" style="width:250px">' +
      '<h3 style="color:#002C9C">' +
      callSign +
      "</h3>" +
      "<table>" +
      "<tr>" +
      "<td>Status</td>" +
      '<td style="color:blue;font-size: 100%;">' +
      status +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Course</td>" +
      "<td><div  id=" +
      callSign +
      '_course style="color:blue;font-size: 100%;">' +
      course +
      "</div></td>" +
      "</tr>" +
      "<tr>" +
      "<td>Speed</td>" +
      '<td style="color:blue;font-size: 100%;">' +
      speed +
      " km/h</td>" +
      "</tr>" +
      "<tr>" +
      "<td>Lat/Long</td>" +
      '<td style="color:blue;font-size: 100%;"><span>' +
      position[1].toFixed(4) +
      "</span>, <span>" +
      position[0].toFixed(4) +
      "</span></td>" +
      "</tr>" +
      "</table>" +
      "<br/>" +
      '<button style="color:blue;" title="PatrolInfo" name="' +
      callSign +
      '" onclick="">More...</button>' +
      "</div>";

    return content;
  }

  render() {
    return (
      <div>
        <div
          style={{
            height: this.state.desktopHeight,
            width: this.state.desktopWidth,
            opacity: 1,
          }}
          id="map"
        ></div>
        <div className="shadowx"></div>
      </div>
    );
  }
}
