/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MapPlot.js
 * Created: Wednesday, 7th April 2021 10:31:29 pm
 * Modified: Thursday, 8th April 2021 3:41:04 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

// Utilities
import React from "react";
import ReactDOMServer from "react-dom/server";

// components
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const google = window.google ? window.google : {};

const childrenSideBySideStyle = {
  display: "flex",
  flexDirection: "row",
};

const InfoWindowContent = (callSign) => (
  <div style={{ width: 230 }}>
    <h6>{callSign}</h6>
    <img
      style={{ margin: "5px 20px 5px 10px" }}
      src={"img/reports/zone3/" + callSign + ".jpg"}
      width="210px"
      height="auto"
      object-fit="contain"
    />

    <hr />
    {callSign === "KM DANGA" ? (
      <div>
        <p style={{ fontSize: 12 }}>
          KEDUDUKAN: <strong>PERAIRAN LAHAD DATU</strong>
        </p>
        <p style={{ fontSize: 12, marginTop: -10 }}>
          HALATUJU: <strong>127</strong>
        </p>
        <p style={{ fontSize: 12, marginTop: -10 }}>
          KELAJUAN: <strong>12 KNOT</strong>
        </p>
        <div style={childrenSideBySideStyle}>
          <div style={{ width: 25 }} />
          <CircularProgressWithLabel value={79} label={"SENJATA"} color={"#2193D3"} />
          <div style={{ width: 20 }} />
          <CircularProgressWithLabel value={38} label={"BAHAN API"} color={"red"} />
          <div style={{ width: 20 }} />
          <CircularProgressWithLabel value={68} label={"RATION"} color={"green"} />
        </div>
        <p>
          {callSign} menjalankan rondaan di Zone 3. Rodaan bermula di sektor LE2 dan
          berakhir di sector LE4.
        </p>
      </div>
    ) : (
      <div>
        <p style={{ fontSize: 12 }}>
          KEDUDUKAN: <strong>PERAIRAN LAHAD DATU</strong>
        </p>
        <p style={{ fontSize: 12, marginTop: -10 }}>
          HALATUJU: <strong>221</strong>
        </p>
        <p style={{ fontSize: 12, marginTop: -10 }}>
          KELAJUAN: <strong>9 KNOT</strong>
        </p>
        <div style={childrenSideBySideStyle}>
          <div style={{ width: 25 }} />
          <CircularProgressWithLabel value={90} label={"SENJATA"} color={"#2193D3"} />
          <div style={{ width: 20 }} />
          <CircularProgressWithLabel value={72} label={"BAHAN API"} color={"#2193D3"} />
          <div style={{ width: 20 }} />
          <CircularProgressWithLabel value={74} label={"RATION"} color={"green"} />
        </div>
        <p>
          {callSign} menjalankan rondaan di Zone 3. Rodaan bermula di sektor LE5 dan
          berakhir di sector LE6.
        </p>
      </div>
    )}
  </div>
);

export default class MapPlot {
  constructor(map) {
    this.gMap = map;

    // Markers Collections
    this.locationMarkers = [];
    this.reportMarkers = [];
    this.circleMarkers = [];
    this.urbMarkers = [];
    this.targetMarkers = [];
    this.policeStationMarkers = [];
    this.zoneReportsMarkers = [];
    this.incidentReportsMarkers = [];
    this.taskingMarkers = [];
    this.responderMarkers = [];
    this.districtBorderMarker = [];
    this.routePathMarker = [];
    this.dispatchRouteMarker = [];
    this.zoneBorderMarker = [];
    this.zoneAssetsMarker = [];
    this.zoneReportsMarker = [];
    this.zoneMarker = [];
    this.cameraMarkers = [];
    this.hvtMarkers = [];
    this.infowindow = [];
    this.cameraList = [];

    this.liveTrackVisibility = false;

    window.MessageDispatcher.SubscribeDispatcher("MapPlot", this.handleDispatchMessage);
  }

  socketOnMessage = (data) => {
    if (data.category == "PATROL") {
      if (data.topic == "TRACK") {
        this._plotLiveResponderSymbol(
          parseFloat(data.body.Latitude),
          parseFloat(data.body.Longitude),
          data.body.CallSign
        );
      }
    }
  };

  handleDispatchMessage = (param) => {
    var self = this;

    if (param.Receiver == "MAP_PLOT") {
      switch (param.Command) {
        case "CLEAR_MAP":
          this._closeInfoWindow(param.Data);
          this.ClearAllZones();
          this.ClearZoneAssets();
          this.ClearZoneReports();
          this.ClearRoute();
          this.ClearCheckPoints();
          this.liveTrackVisibility = false;

        case "CLOSE_INFO_WINDOW":
          this._closeInfoWindow(param.Data);
          break;

        case "CLEAR_ALL_ZONES":
          this.ClearAllZones();
          break;

        case "PLOT_RESPONDER_SYMBOLS":
          this.ClearZoneAssets();
          this.PlotResponders(param.Data);
          break;

        case "PLOT_REPORT_SYMBOLS":
          this.PlotReportSymbols(param.Data);
          this.liveTrackVisibility = false;
          break;

        case "PLOT_INCIDENT_SYMBOLS":
          // 1. Clear all Incident symbols
          // 2. Plot the Incident symbols in the IncidentList
          // this.ClearIncidentSymbols();
          this.PlotIncidentSymbols(param.Data);
          this.liveTrackVisibility = false;
          break;

        case "PLOT_PULSE_SYMBOL":
          this._plotPulse(param.Data);
          break;

        case "PLOT_TASKING_SYMBOLS":
          // 1. Clear all Assets symbols
          // 2. Plot the Assets symbols
          this.ClearTaskingSymbols();
          this.PlotTaskingSymbols(param.Data);
          this.liveTrackVisibility = false;
          break;

        case "PLOT_DISPATCH_SYMBOLS":
          // 1. Clear all Incident symbols
          // 2. Plot the Incident symbols in the DispatchList
          // 3. Plot Responders for each Incidents
          // 4. Plot the route for the NEW Incident
          this.ClearIncidentSymbols();
          this.PlotDispatchSymbols(param.Data);
          this.PlotResponders(param.Data2);
          this.liveTrackVisibility = true;
          break;

        case "CLEAR_ALL_SYMBOLS":
          // 1. Clear circle radius
          // 2. Clear responder symbols
          // 3. Clear dispatch symbols
          // 4. Clear dispatch route
          this.ClearZoneAssets();
          this.ClearZoneReports();
          this.ClearRadiusCircle();
          this.ClearDispatcRoute();
          this.liveTrackVisibility = false;
          break;

        case "PLOT_CIRCLE_RADIUS":
          this.ClearRadiusCircle();
          for (var i = 0; i < param.Data.Radius; i++) {
            this._plotCircle(param.Data.Latitude, param.Data.Longitude, i + 1);
          }
          break;
      }
    }
  };

  // Public ================================================

  ClearAllZones() {
    for (var i = 0; i < this.zoneBorderMarker.length; i++) {
      this.zoneBorderMarker[i].setMap(null);
    }
    this.zoneBorderMarker = [];
  }

  ClearAllRoutes() {
    for (var i = 0; i < this.routePathMarker.length; i++) {
      this.routePathMarker[i].setMap(null);
    }
    this.routePathMarker = [];
    for (var i = 0; i < this.dispatchRouteMarker.length; i++) {
      this.dispatchRouteMarker[i].setMap(null);
    }
    this.dispatchRouteMarker = [];
  }

  ClearCameraSymbol() {
    for (var i = 0; i < this.cameraMarkers.length; i++) {
      this.cameraMarkers[i].setMap(null);
    }
    this.cameraMarkers = [];
  }

  PlotCameraSymbol(pos, label, id, location, cameraId, cameraTypeId, cameraURL) {
    if (pos == undefined) return;
    if (pos.lat == undefined && pos.lng == undefined) {
      return;
    }

    var camera = {
      url: "img/icons/cctv_icon32.png",
      size: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 16),
      labelOrigin: new google.maps.Point(16, 38),
    };

    var shape = {
      coords: [0, 0, 0, 32, 32, 32, 32, 0],
      type: "poly",
    };

    var marker = new google.maps.Marker({
      position: pos,
      draggable: false,
      map: this.gMap,
      icon: camera,
      shape: shape,
      data:
        "location|" +
        location +
        ", cameraId|" +
        cameraId +
        ", name|" +
        label.toUpperCase(),
      label: {
        text: label.toString(),
        color: "white",
        fontSize: "11px",
        fontWeight: "bold",
      },
      id: id,
      cameraURL: cameraURL,
      zIndex: 1,
    });

    this.cameraMarkers.push(marker);

    // Info Window
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 500,
      maxHeight: 500,
    });

    var self = this;
    marker.addListener("click", function () {
      if (cameraTypeId == 99) {
        var url = cameraURL; //'http://'+ self.globals.config.serverIP +':98/uploaded/video/cctv' + cameraId + '.mp4';
        var contentString =
          '<div id="MapInfoWindow" style="color:black;font-size: 90%" >' +
          "<h5>" +
          label.toUpperCase() +
          "</h5>" +
          "<table>" +
          "<tr>" +
          "<td>Location</td>" +
          "<td>" +
          location +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Status</td>" +
          "<td>Active</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Display List</td>" +
          '<td><button style="color:black;" title="AddCameraToList" name="url|' +
          url +
          ", location|" +
          location +
          ", cameraId|" +
          cameraId +
          ", name|" +
          label.toUpperCase() +
          '" onclick="">Add</button></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Alarm</td>" +
          '<td><button style="color:red;" title="CCTVDispatch" name="url|' +
          url +
          ";location|" +
          location +
          ";position|" +
          marker.getPosition() +
          ";cameraId|" +
          cameraId +
          ";name|" +
          label.toUpperCase() +
          '" onclick="">Dispatch</button></td>' +
          "</tr>" +
          "</table>" +
          "</div>" +
          '<div style="max-width:320px; max-height:290px" >' +
          '<video style="object-fit:fill; width:100%; height:auto; overflow:hidden; volume:0.0; muted" autoplay loop>' +
          '<source src="' +
          url +
          '" type="video/mp4">' +
          "</video>" +
          "</div>";
      } else {
        var cameraIP = label.replace(/_/g, ".");
        var url = cameraURL;
        // var url = 'rtsp://admin:HuaWei123@' + cameraIP + '/LiveMedia/ch1/Media1';
        var contentString =
          '<div id="MapInfoWindow" style="color:black;font-size: 100%" >' +
          "<h5>" +
          label.toUpperCase() +
          "</h5>" +
          "<table>" +
          "<tr>" +
          "<td>Location</td>" +
          "<td>" +
          location +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Status</td>" +
          "<td>Active</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Display List</td>" +
          '<td><button style="color:black;" title="AddCameraToList" name="url|' +
          url +
          ", location|" +
          location +
          ", cameraId|" +
          cameraId +
          ", name|" +
          label.toUpperCase() +
          '" onclick="">Add</button></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Alarm</td>" +
          '<td><button style="color:red;" title="CCTVDispatch" name="url|' +
          url +
          ";location|" +
          location +
          ";position|" +
          marker.getPosition() +
          ";cameraId|" +
          cameraId +
          ";name|" +
          label.toUpperCase() +
          '" onclick="">Dispatch</button></td>' +
          "</tr>" +
          "</table>" +
          "</div>" +
          '<div style="max-width:345px; max-height:290px;" >' +
          '<div id="runtimePlayers' +
          id +
          '" >' +
          '<img id="cover' +
          id +
          '" src="img/SegmentedRing.gif" width="240px" height="130px" object-fit="contain"/>' +
          "</div>";
      }

      infowindow.setContent(contentString);
      infowindow.open(this.map, marker);
      infowindow.id = cameraId;
      self.infowindow.push(infowindow);
    });
  }

  ClearDistrictBoundary() {
    for (var i = 0; i < this.districtBorderMarker.length; i++) {
      this.districtBorderMarker[i].setMap(null);
    }
    this.districtBorderMarker = [];
  }

  ClearRoute() {
    for (var i = 0; i < this.routePathMarker.length; i++) {
      this.routePathMarker[i].setMap(null);
    }
    this.routePathMarker = [];
  }

  ClearDispatcRoute() {
    for (var i = 0; i < this.dispatchRouteMarker.length; i++) {
      this.dispatchRouteMarker[i].setMap(null);
    }
    this.dispatchRouteMarker = [];
  }

  PlotRoute(path) {
    // Clear path
    for (var i = 0; i < this.routePathMarker.length; i++) {
      this.routePathMarker[i].setMap(null);
    }
    this.routePathMarker = [];

    var i, marker, route, eol;

    // Define a symbol using SVG path notation, with an opacity of 1.
    var lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 3,
    };

    // Create Route
    var route = new google.maps.Polyline({
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "20px",
        },
      ],
      path: path,
      geodesic: true,
      strokeColor: "red",
      strokeOpacity: 0.4,
      strokeWeight: 5,
    });

    route.setMap(this.gMap);
    this.routePathMarker.push(route);
  }

  PlotDistrictBoundary(path) {
    var polyOptions = {
      path: path,
      strokeColor: "orange",
      strokeOpacity: 0.8,
      strokeWeight: 3,
    };

    var boundary = new google.maps.Polyline(polyOptions);
    boundary.setMap(this.gMap);
    this.districtBorderMarker.push(boundary);
  }

  ClearCheckPoints() {
    for (var i = 0; i < this.zoneMarker.length; i++) {
      this.zoneMarker[i].setMap(null);
    }
    this.zoneMarker = [];
  }

  PlotCheckPoints(path) {
    // Clear all zones before plotting a new one
    for (var i = 0; i < this.zoneMarker.length; i++) {
      this.zoneMarker[i].setMap(null);
    }
    this.zoneMarker = [];

    for (var i = 0; i < path.length; i++) {
      var marker = new google.maps.Marker({
        position: { lat: path[i].lat, lng: path[i].lng },
        map: this.gMap,
        label: {
          text: "P" + (i + 1),
          color: "white",
          fontSize: "11px",
          fontWeight: "bold",
        },
      });

      this.zoneMarker.push(marker);
    }
  }

  PlotBoundaryMarker(path) {
    // Clear all zones before plotting a new one
    for (var i = 0; i < this.zoneMarker.length; i++) {
      this.zoneMarker[i].setMap(null);
    }
    this.zoneMarker = [];

    for (var i = 0; i < path.length; i++) {
      var marker = new google.maps.Marker({
        position: { lat: path[i].lat, lng: path[i].lng },
        map: this.gMap,
        label: {
          text: "P" + (i + 1),
          color: "white",
          fontSize: "11px",
          fontWeight: "bold",
        },
      });

      this.zoneMarker.push(marker);
    }
  }

  PlotZoneBoundary(path) {
    // Clear all zones before plotting a new one
    for (var i = 0; i < this.zoneBorderMarker.length; i++) {
      this.zoneBorderMarker[i].setMap(null);
    }
    this.zoneBorderMarker = [];

    // Set ploygon options
    var polyOptions = {
      path: path,
      strokeColor: "#1497D0",
      strokeOpacity: 0.6,
      strokeWeight: 4,
      fillColor: "#1497D0",
      fillOpacity: 0.1,
    };

    // Plot markers
    // this.PlotBoundaryMarker(path);

    // Plot & push to marker list
    var boundary = new google.maps.Polygon(polyOptions);
    boundary.setMap(this.gMap);
    this.zoneBorderMarker.push(boundary);

    // Zoom to boundary
    var bounds = this._getPolygonBounds(boundary);
    this.gMap.fitBounds(bounds);
  }

  PlotZoneAssets(data) {
    this._plotResponders(data);
  }

  PlotReportSymbols(data) {
    for (var i = 0; i < data.length; i++) {
      this._plotReports(data[i]);
    }
  }

  PlotIncidentSymbols(data) {
    for (var i = 0; i < data.length; i++) {
      this._plotIncidentSymbols(data[i]);
    }
  }

  PlotTaskingSymbols(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].Display === true) {
        this._plotTaskingSymbols(data[i]);
      }
    }
  }

  PlotDispatchSymbols(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].Display === true) {
        this._plotDispatchSymbols(data[i]);
      }
    }
  }

  PlotResponders(data) {
    if (data != undefined) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].Display === true) {
          // Data Adapter ========================
          var itemData = {
            type: data[i].VehicleTypeName,
            lat: Number(data[i].Latitude),
            lng: Number(data[i].Longitude),
            label: data[i].CallSign,
            name: data[i].VehicleTypeName,
            icon: data[i].VehicleIcon,
            id: Number(data[i].VehicleId),
          };
          //======================================
          this._plotResponders(itemData);
        }
      }
    }
  }

  PlotNewRoute() {}

  ClearZoneReports() {
    for (var i = 0; i < this.zoneReportsMarkers.length; i++) {
      this.zoneReportsMarkers[i].setMap(null);
    }
    this.zoneReportsMarkers = [];
  }

  ClearRadiusCircle() {
    for (var i = 0; i < this.circleMarkers.length; i++) {
      this.circleMarkers[i].setMap(null);
    }
    this.circleMarkers = [];
  }

  ClearZoneAssets() {
    for (var i = 0; i < this.zoneAssetsMarker.length; i++) {
      this.zoneAssetsMarker[i].setMap(null);
    }
    this.zoneAssetsMarker = [];
  }

  ClearIncidentSymbols() {
    for (var i = 0; i < this.incidentReportsMarkers.length; i++) {
      this.incidentReportsMarkers[i].setMap(null);
    }
    this.incidentReportsMarkers = [];
  }

  ClearTaskingSymbols() {
    for (var i = 0; i < this.taskingMarkers.length; i++) {
      this.taskingMarkers[i].setMap(null);
    }
    this.taskingMarkers = [];
  }

  // Local ================================================

  _calculateRoute(origin, destination, id) {
    var directionsService = new google.maps.DirectionsService();

    var request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    var self = this;
    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        self._plotCalculatedRoute(
          self.gMap,
          result.routes[0].overview_path,
          destination,
          id
        );
      }
    });
  }

  _plotCalculatedRoute(map, pathCoords, destination, id) {
    var i, marker, route, eol;

    // Define a symbol using SVG path notation, with an opacity of 1.
    var lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 3,
    };

    // Create Route
    var route = new google.maps.Polyline({
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "20px",
        },
      ],
      path: pathCoords,
      geodesic: true,
      strokeColor: "cyan",
      strokeOpacity: 0.2,
      editable: false,
      map: map,
      id: id,
    });

    this.dispatchRouteMarker.push(route);

    // eol = route.Distance();
  }

  _plotCircle(lat, lng, distance) {
    var circle = new google.maps.Circle({
      strokeColor: "#2396C8",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.0,
      map: this.gMap,
      center: { lat: lat, lng: lng },
      radius: distance * 1000,
    });

    this.circleMarkers.push(circle);
  }

  _plotPulse(pos) {
    var marker = new google.maps.Marker({
      position: pos,
      map: this.gMap,
      icon: null,
    });
    var icon = {
      url: "img/markers/red_pulse4.gif",
      scaledSize: new google.maps.Size(64, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32, 48),
    };
    marker.icon = icon;
    marker.setZIndex(1);
    this.circleMarkers.push(marker);
  }

  _closeInfoWindow(id) {
    for (var i = this.infowindow.length - 1; i >= 0; i--) {
      if (this.infowindow[i].id == id) {
        this.infowindow[i].close();
      }
    }
  }

  _plotLiveResponderSymbol(lat, lng, callSign) {
    if (isNaN(lat)) return;
    if (isNaN(lng)) return;

    var pos = { lat: lat, lng: lng };
    var blnExit = false;

    // Update existing marker
    var self = this;
    this.zoneAssetsMarker.forEach(function (marker) {
      if (marker == undefined) blnExit = true;

      if (marker.id == callSign) {
        marker.setPosition(pos);
        marker.setVisible(self.liveTrackVisibility);
        // marker.setIcon(self.getIcon(markerType));
        if (document.getElementById(callSign) !== null) {
          document.getElementById(callSign).innerHTML =
            "<span>" + lat.toFixed(4) + "," + lng.toFixed(4) + " </span>";
        }
        blnExit = true;
      }
    });

    // Create Marker (Skip if already updated)
    if (blnExit) return;

    // Create new marker
    var marker = new google.maps.Marker({
      position: pos,
      draggable: false,
      map: this.gMap,
      icon: null,
      label: {
        text: callSign,
        color: "white",
        fontSize: "11px",
        fontWeight: "bold",
      },
      id: callSign,
      title: callSign,
      // zIndex: 1,
    });

    var icon = {
      url: "img/icons/mpv_red_64.png",
      size: new google.maps.Size(64, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32, 64),
      labelOrigin: new google.maps.Point(32, -10),
    };
    marker.icon = icon;
    marker.setZIndex(3);
    marker.setVisible(this.liveTrackVisibility);

    this.zoneAssetsMarker.push(marker);
  }

  _plotResponders(data) {
    var marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map: this.gMap,
      icon: null,
      type: data.type,
      label: {
        text: data.label.toString(),
        color: "white",
        fontSize: "11px",
        fontWeight: "bold",
      },
      name: data.name,
      title: data.label,
      id: data.id,
      // zIndex: 1,
    });

    // Add to markers collection
    var icon = {
      url: "img/icons/" + data.icon,
      size: new google.maps.Size(64, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32, 64),
      labelOrigin: new google.maps.Point(32, -10),
    };
    marker.icon = icon;
    marker.setZIndex(3);
    this.zoneAssetsMarker.push(marker);

    // Set Info Window data
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 250,
      maxHeight: 200,
    });

    var self = this;
    marker.addListener("click", function () {
      // self._getVehicleData(data.id, function (data) {
      var callSign = data.label.toString();
      var displaySpeed = "64";
      var patrolId = data.label.toString();

      var contentString =
        '<div id="MapInfoWindow" style="color:black;font-size:90%;width:200px" >' +
        "<h5>" +
        callSign +
        "</h5>" +
        "<table>" +
        "<tr>" +
        "<td>Status</td>" +
        "<td>Patrol</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Course</td>" +
        "<td><div  id=" +
        callSign +
        '_course style="color:black;font-size: 100%;">North</div></td>' +
        "</tr>" +
        "<tr>" +
        "<td>Speed</td>" +
        "<td>" +
        displaySpeed +
        " km/h</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Latitude</td>" +
        "<td><div id=" +
        callSign +
        ' style="color:black;font-size: 100%;">' +
        marker.getPosition().lat().toString().substring(0, 7) +
        "</div></td>" +
        "</tr>" +
        "<tr>" +
        "<td>Longitude</td>" +
        "<td><div id=" +
        callSign +
        ' style="color:black;font-size: 100%;">' +
        marker.getPosition().lng().toString().substring(0, 7) +
        "</div></td>" +
        "</tr>" +
        "<tr>" +
        '<td><button style="color:blue;" title="PatrolInfo" name="patrolId|' +
        patrolId +
        ";callSign|" +
        callSign +
        '"onclick="">Info</button></td>' +
        "<td></td>" +
        "</tr>" +
        "</table>" +
        "</div>";

      infowindow.setContent(contentString);
      infowindow.open(self.map, marker);
    });
    // });
  }

  _plotReports(data) {
    var marker = new google.maps.Marker({
      position: { lat: data.Latitude, lng: data.Longitude },
      map: this.gMap,
      icon: null,
      // type: data.type,
      label: {
        text: data.ReportTypeName,
        color: "white",
        fontSize: "11px",
        fontWeight: "bold",
      },
      zIndex: 1,
    });

    // Add to markers collection
    var icon = {
      url: "img/markers/red_pulse.gif",
      scaledSize: new google.maps.Size(32, 32),
      size: new google.maps.Size(32, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 32),
      labelOrigin: new google.maps.Point(14, 14),
    };
    marker.icon = icon;
    this.zoneReportsMarkers.push(marker);

    // var infowindow = new google.maps.InfoWindow({
    //   maxWidth: 250,
    //   maxHeight: 200,
    // });

    // var self = this;
    // marker.addListener("click", function () {
    //   var currentImage = data.ReportFeeds[0].ActualName;

    //   var contentString =
    //     '<div id="MapInfoWindow" style="color:black;font-size: 80%" >' +
    //     "<h6>" +
    //     data.ReportTypeName.toUpperCase() +
    //     "</h4>" +
    //     "<table>" +
    //     "<tr>" +
    //     "<td>Report By</td>" +
    //     "<td>" +
    //     data.CreatedByFullName +
    //     "</td>" +
    //     "</tr>" +
    //     "<tr>" +
    //     "<td>Date/Time</td>" +
    //     "<td>" +
    //     data.CreatedDateTime.replace("T", " @ ") +
    //     "</td>" +
    //     "</tr>" +
    //     "<tr>" +
    //     "<td>Description</td>" +
    //     "<td>" +
    //     data.Description +
    //     "</td>" +
    //     "</tr>" +
    //     "<div>" +
    //     '<img src="' +
    //     currentImage +
    //     '" width="100%" height="auto" object-fit="contain"/>' +
    //     "</div>" +
    //     "</table>" +
    //     "</div>";

    //   infowindow.setContent(contentString);
    //   infowindow.open(self.map, marker);
    // });
  }

  _plotIncidentSymbols(data) {
    var marker = new google.maps.Marker({
      position: { lat: data.Latitude, lng: data.Longitude },
      map: this.gMap,
      icon: null,
      type: data.ReportTypeName,
      label: {
        text: data.ReportTypeName,
        color: data.ReportColor,
        fontSize: "18px",
        fontWeight: "bold",
      },
      zIndex: 1,
    });

    // Add to markers collection
    var icon = {
      url: "img/markers/red_pulse.gif",
      scaledSize: new google.maps.Size(32, 32),
      size: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 32),
      labelOrigin: new google.maps.Point(16, -10),
    };
    marker.icon = icon;
    marker.setZIndex(3);
    this.incidentReportsMarkers.push(marker);

    var infowindow = new google.maps.InfoWindow({
      maxWidth: 250,
      maxHeight: 200,
    });

    var self = this;
    marker.addListener("click", function () {
      var contentString =
        '<div id="MapInfoWindow" style="color:black;font-size: 90%;" >' +
        "<h2>" +
        data.ReportTypeName.toUpperCase() +
        "</h2>" +
        "<table>" +
        "<tr>" +
        "<td>Location</td>" +
        "<td>" +
        data.Location +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Date/Time</td>" +
        "<td>" +
        data.CreatedDateTime.replace("T", " @ ") +
        "</td>" +
        "</tr>" +
        "</tr>" +
        "<div>" +
        '<img src="' +
        data.MediaLink +
        '" width="100%" height="auto" object-fit="contain"/>' +
        "</div>" +
        "</table>" +
        "</div>";

      infowindow.setContent(contentString);
      infowindow.open(self.map, marker);
    });
  }

  _plotTaskingSymbols(data) {
    var marker = new google.maps.Marker({
      position: { lat: data.Latitude, lng: data.Longitude },
      map: this.gMap,
      icon: null,
      type: data.CallSign,
      label: {
        text: data.CallSign,
        color: data.FillColor,
        fontSize: "12px",
        fontWeight: "normal",
      },
      zIndex: 1,
    });

    // Add to markers collection
    var icon = {
      url: "img/icons/" + data.PatrolIcon,
      scaledSize: new google.maps.Size(64, 64),
      size: new google.maps.Size(64, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32, 32),
      labelOrigin: new google.maps.Point(32, 5),
    };
    marker.icon = icon;
    marker.setZIndex(3);
    this.taskingMarkers.push(marker);

    var self = this;

    var infowindow = new google.maps.InfoWindow({
      width: "100%",
    });

    marker.addListener("click", function () {
      const content = ReactDOMServer.renderToString(InfoWindowContent(data.CallSign));
      infowindow.setContent(content);
      infowindow.open(self.map, marker);
    });
  }

  _plotDispatchSymbols(data) {
    var marker = new google.maps.Marker({
      position: { lat: data.Latitude, lng: data.Longitude },
      map: this.gMap,
      icon: null,
      type: data.ReportTypeName,
      label: {
        text: data.ReportTypeName.toString(),
        color: "red",
        fontSize: "12px",
        fontWeight: "bold",
      },
      zIndex: 1,
    });

    // Add to markers collection
    var icon = {
      url: "img/icons/operation.png",
      scaledSize: new google.maps.Size(32, 42),
      size: new google.maps.Size(32, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 32),
      labelOrigin: new google.maps.Point(16, -10),
    };
    marker.icon = icon;
    marker.setZIndex(3);
    this.incidentReportsMarkers.push(marker);

    // Plot route from incident location to unit
    if (data.IsAssignedUnitLive === false) {
      var incident = new google.maps.LatLng(data.Latitude, data.Longitude);
      var unit = new google.maps.LatLng(data.UnitLatitude, data.UnitLongitude);
      this._calculateRoute(unit, incident, data.ReportId);
    } else {
      var self = this;
      var v = setInterval(function () {
        var unit = new google.maps.LatLng(data.Latitude, data.Longitude);
        if (self.zoneAssetsMarker.length > 2) {
          for (var i = 0; i < self.zoneAssetsMarker.length; i++) {
            if (self.zoneAssetsMarker[i].name === data.CallSign) {
              unit = self.zoneAssetsMarker[i].position;
            }
          }
          var incident = new google.maps.LatLng(data.Latitude, data.Longitude);
          self._calculateRoute(unit, incident, data.ReportId);
          clearInterval(v);
        }
      }, 500);
    }

    var infowindow = new google.maps.InfoWindow({
      maxWidth: 250,
      maxHeight: 200,
    });

    var self = this;
    marker.addListener("click", function () {
      var contentString =
        '<div id="MapInfoWindow" style="color:black;font-size: 80%" >' +
        "<h6>" +
        data.ReportTypeName.toUpperCase() +
        "</h4>" +
        "<table>" +
        "<tr>" +
        "<td>Location</td>" +
        "<td>" +
        data.Location +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Date/Time</td>" +
        "<td>" +
        data.CreatedDateTime.replace("T", " @ ") +
        "</td>" +
        "</tr>" +
        "</table>" +
        "</div>";

      infowindow.setContent(contentString);
      infowindow.open(self.map, marker);
    });
  }

  _getReportData(reportId, callback) {
    fetch("data/District/Zone/Zone5/Report.json")
      .then((result) => result.json())
      .then((data) => {
        callback(data[reportId]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  _getVehicleData(vehicleId, callback) {
    fetch(
      "http://" +
        this.globals.config.serverIP +
        ":9797/api/patrolVehicles?patrolRosterId=1&vehicleId=" +
        vehicleId
    )
      .then((result) => result.json())
      .then((data) => {
        callback(data[0]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  _getPolygonBounds(polygon) {
    var paths = polygon.getPaths();
    var bounds = new google.maps.LatLngBounds();
    paths.forEach(function (path) {
      var ar = path.getArray();
      for (var i = 0, l = ar.length; i < l; i++) {
        bounds.extend(ar[i]);
      }
    });
    return bounds;
  }
}
