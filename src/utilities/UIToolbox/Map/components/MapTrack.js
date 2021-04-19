// Utilities
import MessageDispatcher from "utilities/MessageDispatcher";
import MapCalculate from "./MapCalculate";
import MapPlot from "./MapPlot";

const google = window.google ? window.google : {};

export default class MapFunctions {
  constructor(map) {
    this.gMap = map;
    this.mapCalculate = new MapCalculate(this.gMap);
    this.mapPlot = new MapPlot(this.gMap);

    // Display Track
    this.displayTrack = true;

    // Markers Collection
    this.cameraMarkers = [];
    this.locationMarkers = [];
    this.reportMarkers = [];
    this.circleMarkers = [];
    this.urbMarkers = [];
    this.assetMarkers = [];
    this.targetMarkers = [];
    this.policeStationMarkers = [];
    this.zoneReportsMarkers = [];
    this.responderMarkers = [];
    this.districtBorder = [];

    this.infowindow = [];

    this.msgDispatcher = new MessageDispatcher();
    this.msgDispatcher.SubscribeMessageDispatcher = this.handleDispatchMessage;
  }

  handleSocketIOMessage = (msg) => {
    var self = this;
    var obj = JSON.parse(msg);

    if (obj.Type.toUpperCase() == "ORGANIZATIONTRACK") {
      switch (obj.Content.PatrolTypeId) {
        case "1":
          switch (obj.Content.PatrolStatusId) {
            case "1":
              this._plotResponderSymbol(
                "MOB_GRAY",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
            case "2":
              this._plotResponderSymbol(
                "MOB_BLUE",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
            case "3":
              this._plotResponderSymbol(
                "MOB_RED",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
          }
          break;
        case "2":
          switch (obj.Content.PatrolStatusId) {
            case "1":
              this._plotResponderSymbol(
                "URB_GRAY",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
            case "2":
              this._plotResponderSymbol(
                "URB_BLUE",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
            case "3":
              this._plotResponderSymbol(
                "URB_RED",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
          }
          break;
        case "3":
          switch (obj.Content.PatrolStatusId) {
            case "1":
              this._plotResponderSymbol(
                "MPV_GRAY",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
            case "2":
              this._plotResponderSymbol(
                "MPV_BLUE",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
            case "3":
              this._plotResponderSymbol(
                "MPV_RED",
                parseFloat(obj.Content.Latitude),
                parseFloat(obj.Content.Longitude),
                obj.Content.CallSign,
                obj.Content.VehicleId
              );
              break;
          }
          break;
      }
    }
  };

  handleDispatchMessage = (param) => {
    var self = this;
    if (param.Receiver == "MAP_TRACK") {
      switch (param.Command) {
        case "DISPLAY_TRACK":
          this.displayTrack = !this.displayTrack;
          break;
      }
    }
  };

  // Socket ====================================================

  handleSocketMessage = (data) => {
    var msgFormat = data.split("~|'");
    if (msgFormat.length < 4) return;
    var senderId = msgFormat[0].toUpperCase();
    var category = msgFormat[1].toUpperCase();
    var topic = msgFormat[2].toUpperCase();
    var body = msgFormat[3];

    var self = this;

    if (topic == "SIGNEDOFF") {
      var res = data.replace("WSGW~|'ACCOUNT~|'signedOff~|'", "");
      var obj = JSON.parse(res);
      this._plotResponderSymbol(
        "REMOVE",
        parseFloat(obj.Latitude),
        parseFloat(obj.Longitude),
        obj.CallSign,
        obj.VehicleId
      );
    }

    if (topic == "PATROLSTATUS") {
      var res = data.replace("WSGW~|'PATROL~|'patrolStatus~|'", "");
      var obj = JSON.parse(res);

      switch (obj.PatrolTypeId) {
        case 1:
          switch (obj.PatrolStatusId) {
            case 1:
              this._plotResponderSymbol(
                "MOB_GRAY",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 2:
              this._plotResponderSymbol(
                "MOB_BLUE",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 3:
              this._plotResponderSymbol(
                "MOB_RED",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
          }
          break;
        case 2:
          switch (obj.PatrolStatusId) {
            case 1:
              this._plotResponderSymbol(
                "URB_GRAY",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 2:
              this._plotResponderSymbol(
                "URB_BLUE",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 3:
              this._plotResponderSymbol(
                "URB_RED",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
          }
          break;
        case 3:
          switch (obj.PatrolStatusId) {
            case 1:
              this._plotResponderSymbol(
                "MPV_GRAY",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 2:
              this._plotResponderSymbol(
                "MPV_BLUE",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 3:
              this._plotResponderSymbol(
                "MPV_RED",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
          }
          break;
      }
    }

    if (topic == "TRACKSIM") {
      var res = data.replace("WSGW~|'PATROL~|'trackSIM~|'", "");
      var obj = JSON.parse(res);

      switch (obj.PatrolTypeId) {
        case 1:
          this._plotResponderSymbol(
            "MOB_BLUE",
            parseFloat(obj.Latitude),
            parseFloat(obj.Longitude),
            obj.CallSign,
            obj.VehicleId,
            obj.Course
          );
          break;
        case 2:
          this._plotResponderSymbol(
            "URB_BLUE",
            parseFloat(obj.Latitude),
            parseFloat(obj.Longitude),
            obj.CallSign,
            obj.VehicleId,
            obj.Course
          );
          break;
        case 3:
          this._plotResponderSymbol(
            "MPV_BLUE",
            parseFloat(obj.Latitude),
            parseFloat(obj.Longitude),
            obj.CallSign,
            obj.VehicleId,
            obj.Course
          );
          break;
      }
    }

    if (topic == "TRACK") {
      var res = data.replace("WSGW~|'PATROL~|'track~|'", "");
      var obj = JSON.parse(res);

      switch (obj.PatrolTypeId) {
        case 1:
          switch (obj.PatrolStatusId) {
            case 1:
              this._plotResponderSymbol(
                "MOB_GRAY",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 2:
              this._plotResponderSymbol(
                "MOB_BLUE",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 3:
              this._plotResponderSymbol(
                "MOB_RED",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
          }
          break;
        case 2:
          switch (obj.PatrolStatusId) {
            case 1:
              this._plotResponderSymbol(
                "URB_GRAY",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 2:
              this._plotResponderSymbol(
                "URB_BLUE",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 3:
              this._plotResponderSymbol(
                "URB_RED",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
          }
          break;
        case 3:
          switch (obj.PatrolStatusId) {
            case 1:
              this._plotResponderSymbol(
                "MPV_GRAY",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 2:
              this._plotResponderSymbol(
                "MPV_BLUE",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
            case 3:
              this._plotResponderSymbol(
                "MPV_RED",
                parseFloat(obj.Latitude),
                parseFloat(obj.Longitude),
                obj.CallSign,
                obj.VehicleId
              );
              break;
          }
          break;
      }
    }
  };

  // Public ====================================================

  _plotResponderSymbol(markerType, lat, lng, callSign, vehicleId, course) {
    var pos = { lat: lat, lng: lng };
    var blnExit = false;
    var x = this.responderMarkers.length;
    var vecId = vehicleId;

    // Remove marker
    if (markerType == "REMOVE") {
      for (var i = 0; i < this.responderMarkers.length; i++) {
        if (this.responderMarkers[i].id == callSign) {
          this.responderMarkers[i].setMap(null);
          this.responderMarkers.splice(i, 1);
          return;
        }
      }
    }

    // Update marker
    var self = this;
    this.responderMarkers.forEach(function (marker) {
      if (marker.id == callSign) {
        marker.setPosition(pos);
        marker.setVisible(self.displayTrack);
        marker.setIcon(self._getIcon(markerType));
        if (document.getElementById(callSign) !== null) {
          document.getElementById(callSign + "_course").innerHTML =
            "<span>" + course + " </span>";
          document.getElementById(callSign).innerHTML =
            "<span>" + lat.toFixed(4) + "," + lng.toFixed(4) + " </span>";
        }
        blnExit = true;
      }
    });

    // Create Marker
    if (blnExit) return;

    // Create new marker
    var marker, i;

    // Default icon needed
    var icon = this._getIcon(markerType);

    var marker = new google.maps.Marker({
      position: pos,
      draggable: false,
      map: this.gMap,
      icon: icon,
      label: {
        text: callSign,
        color: "blue",
        fontSize: "11px",
        fontWeight: "bold",
      },
      id: callSign,
      title: callSign,
      zIndex: 1,
    });

    var patrolId = 0;

    marker.info = new google.maps.InfoWindow({
      content:
        '<div id="MapInfoWindow" style="color:black;font-size: 80%" >' +
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
        '_course style="color:black;font-size: 100%;"></div></td>' +
        "</tr>" +
        "<tr>" +
        "<td>Speed</td>" +
        "<td>65 km/h</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Lat/Long</td>" +
        "<td><div id=" +
        callSign +
        ' style="color:black;font-size: 100%;"></div></td>' +
        "</tr>" +
        "<tr>" +
        '<td><button style="color:blue;" title="PatrolInfo" name="callSign|' +
        callSign +
        '" onclick="">Info</button></td>' +
        "<td></td>" +
        "</tr>" +
        "</table>" +
        "</div>",
    });

    google.maps.event.addListener(marker, "click", function () {
      marker.info.open(this.gMap, marker);
      document.getElementById(marker.id + "_course").innerHTML =
        "<span>" + course + " </span>";
      document.getElementById(marker.id).innerHTML =
        "<span>" + lat.toFixed(4) + "," + lng.toFixed(4) + " </span>";
    });

    this.responderMarkers.push(marker);
  }

  _getIcon(name) {
    var icon;

    switch (name) {
      case "DISTRESS_MPV":
        icon = {
          url: "img/icons/mpv_icon32_red.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "DISTRESS_URB":
        icon = {
          url: "img/icons/urb_icon32_red.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "DISTRESS_MOB":
        icon = {
          url: "img/icons/mob_icon32_red.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "MPV":
        icon = {
          url: "img/icons/mpv_map_icon32.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, 24),
        };
        break;

      case "MPV_GRAY":
        icon = {
          url: "img/icons/mpv_gray_64.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "MPV_BLUE":
        icon = {
          url: "img/icons/MPV.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "MPV_RED":
        icon = {
          url: "img/icons/mpv_red_64.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "URB":
        icon = {
          url: "img/icons/urb_map_icon48.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(24, 19),
        };
        break;

      case "URB_BLUE":
        icon = {
          url: "img/icons/urb_blue_64.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "URB_GRAY":
        icon = {
          url: "img/icons/urb_gray_64.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "URB_RED":
        icon = {
          url: "img/icons/urb_red_64.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "MOB":
        icon = {
          url: "img/icons/mob_map_icon48.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(24, 19),
        };
        break;

      case "MOB_BLUE":
        icon = {
          url: "img/icons/mob_blue_64.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "MOB_GRAY":
        icon = {
          url: "img/icons/mob_gray_64.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;

      case "MOB_RED":
        icon = {
          url: "img/icons/mob__red_64.png",
          size: new google.maps.Size(64, 64),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(32, 64),
          labelOrigin: new google.maps.Point(32, -10),
        };
        break;
    }

    return icon;
  }
}
