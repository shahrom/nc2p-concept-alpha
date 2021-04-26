/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: MapFunctions.js
 * Created: Wednesday, 18th November 2020 3:59:55 pm
 * Modified: Wednesday, 18th November 2020 4:46:52 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import MapCalculate from "./MapCalculate";
import MapPlot from "./MapPlot";
import MapTrack from "./MapTrack";

const google = window.google ? window.google : {};

export default class MapFunctions {
  constructor(map) {
    this.gMap = map;
    this.mapCalculate = new MapCalculate(this.gMap);
    this.mapPlot = new MapPlot(this.gMap);
    this.mapTrack = new MapTrack(this.gMap);

    this.isDisplayZonePatrol = false;
    this.isDisplayZoneReports = false;
    this.isDisplayUserRoute = false;
    this.isDisplayUserCheckPoints = false;

    this.trafficStatusChecked = false;
    this.trafficLayer = new google.maps.TrafficLayer();
    this.geoCoder = new google.maps.Geocoder();

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

    window.MessageDispatcher.SubscribeDispatcher(
      "MapFunctions",
      this.handleDispatchMessage
    );
  }

  handleDispatchMessage = (param) => {
    var self = this;

    if (param.Receiver == "MAP_FUNCTIONS") {
      switch (param.Command) {
        case "CLEAR_USER_ROUTE_CHECKPOINTS":
          self.isDisplayUserRoute = false;
          self.isDisplayUserCheckPoints = false;
          self.mapPlot.ClearRoute();
          self.mapPlot.ClearCheckPoints();
          break;

        case "CLEAR_ALL_SYMBOLS":
          this.isDisplayZonePatrol = false;
          this.isDisplayZoneReports = false;
          self.mapPlot.ClearZoneAssets();
          self.mapPlot.ClearZoneReports();
          break;

        case "DISPLAY_USER_ROUTE":
          self.isDisplayUserRoute = !self.isDisplayUserRoute;
          self.DisplayUserRoute(
            self.isDisplayUserRoute,
            param.Data.ZoneId,
            param.Data.CallSign
          );
          break;

        case "DISPLAY_USER_CHECKPOINTS":
          self.isDisplayUserCheckPoints = !self.isDisplayUserCheckPoints;
          self.DisplayUserCheckPoints(
            self.isDisplayUserCheckPoints,
            param.Data.ZoneId,
            param.Data.CallSign
          );
          break;

        case "CLEAR_ALL_ROUTES":
          self.ClearAllRoutes();
          break;

        case "PLOT_INCIDENT":
          self.DisplayHVT(param.Data);
          break;

        case "PLOT_HIGH_VALUE_TARGET":
          self.DisplayHVT(param.Data);
          break;

        case "PLOT_ROUTE":
          self.DisplayRoute(param.Data);
          break;

        case "PLOT_CAMERA_ON_MAP":
          self.DisplayCameraSymbol(true);
          break;

        case "PLOT_DISTRICT_BOUNDARY":
          self.DisplayDistrictBoundary(true);
          break;

        case "PLOT_ZONE_BOUNDARY":
          self.DisplayZoneBoundary(param.Data);
          break;

        case "DISPLAY_ZONE_ASSETS":
          self.isDisplayZonePatrol = !self.isDisplayZonePatrol;
          self.DisplayZonePatrol(self.isDisplayZonePatrol, param.Data);
          break;

        case "DISPLAY_ZONE_REPORTS":
          self.isDisplayZoneReports = !self.isDisplayZoneReports;
          self.DisplayZoneReports(self.isDisplayZoneReports, param.Data);
          break;
      }
    }
  };

  // Public ====================================================

  ClearAllRoutes() {
    this.mapPlot.ClearAllRoutes();
  }

  PlotCircle(lat, lng, distance, colorid) {
    var circle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.1,
      map: this.gMap,
      center: { lat: lat, lng: lng },
      radius: distance,
    });

    this.circleMarkers.push(circle);
  }

  DisplayHVT(data) {
    var self = this;
    var pos = {
      lat: Number(data.Latitude),
      lng: Number(data.Longitude),
    };
    this.ZoomToPoint(pos, 18);
    this.PlotCircle(pos.lat, pos.lng, 30, 1);
  }

  DisplayCameraSymbol(mode) {
    // if (mode) {
    //   if (this.dataService.cameraList.length == 0) {
    //     this.dataService.GetCameraListData();
    //     return;
    //   }
    //   for (var i = 0; i < this.dataService.cameraList.length; i++) {
    //     var pos = {
    //       lat: Number(this.dataService.cameraList[i].Latitude),
    //       lng: Number(this.dataService.cameraList[i].Longitude),
    //     };
    //     this.mapPlot.PlotCameraSymbol(
    //       pos,
    //       this.dataService.cameraList[i].CameraName,
    //       this.dataService.cameraList[i].CameraId,
    //       this.dataService.cameraList[i].Location,
    //       this.dataService.cameraList[i].CameraId,
    //       this.dataService.cameraList[i].CameraTypeId,
    //       this.dataService.cameraList[i].CameraURL
    //     );
    //   }
    // } else {
    //   this.mapPlot.ClearCameraSymbol();
    // }
  }

  DisplayZoneBoundary(id) {
    var self = this;

    self.dataService.GetZoneBoundaryData(id, function (data) {
      var path = [];
      for (var i = 0; i < data.length; i++) {
        var pos = {
          lat: Number(data[i].Latitude),
          lng: Number(data[i].Longitude),
        };
        path.push(pos);
      }
      self.mapPlot.PlotZoneBoundary(path);
    });
  }

  DisplayUserRoute(mode, zoneId, callSign) {
    var self = this;

    if (mode) {
      self.dataService.GetUserRouteData(zoneId, callSign, function (data) {
        var path = [];
        for (var i = 0; i < data.length; i++) {
          var pos = {
            lat: Number(data[i].Latitude),
            lng: Number(data[i].Longitude),
          };
          path.push(pos);
        }
        self.mapPlot.PlotRoute(path);
      });
    } else {
      self.mapPlot.ClearRoute();
    }
  }

  DisplayUserCheckPoints(mode, zoneId, callSign) {
    var self = this;

    if (mode) {
      self.dataService.GetUserCheckPointsData(zoneId, callSign, function (data) {
        var path = [];
        for (var i = 0; i < data.length; i++) {
          var pos = {
            lat: Number(data[i].Latitude),
            lng: Number(data[i].Longitude),
          };
          path.push(pos);
        }
        self.mapPlot.PlotCheckPoints(path);
      });
    } else {
      self.mapPlot.ClearCheckPoints();
    }
  }

  DisplayRoute(index) {
    var self = this;

    self.dataService.GetZoneRouteData(index, function (data) {
      var path = [];
      for (var i = 0; i < data.length; i++) {
        var pos = {
          lat: Number(data[i].Latitude),
          lng: Number(data[i].Longitude),
        };
        path.push(pos);
      }
      self.mapPlot.PlotRoute(path);
    });
  }

  DisplayDistrictBoundary(mode) {
    // if (mode) {
    //   if (this.dataService.districtBoundaryPath.length == 0) {
    //     this.dataService.GetDistrictBoundaryData();
    //     return;
    //   }
    //   var path = [];
    //   for (var i = 0; i < this.dataService.districtBoundaryPath.length; i++) {
    //     var pos = {
    //       lat: Number(this.dataService.districtBoundaryPath[i].Latitude),
    //       lng: Number(this.dataService.districtBoundaryPath[i].Longitude),
    //     };
    //     path.push(pos);
    //   }
    //   this.mapPlot.PlotDistrictBoundary(path);
    // } else {
    //   this.mapPlot.ClearDistrictBoundary();
    // }
  }

  DisplayZonePatrol(mode, id) {
    var self = this;

    if (mode) {
      self.dataService.GetZonePatrolData(id, function (data) {
        for (var i = 0; i < data.length; i++) {
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
          self.mapPlot.PlotZoneAssets(itemData);
        }
      });
    } else {
      this.mapPlot.ClearZoneAssets();
    }
  }

  DisplayZoneReports(mode, id) {
    var self = this;

    if (mode) {
      self.dataService.GetZoneReportData(id, function (data) {
        for (var i = 0; i < data.length; i++) {
          var itemData = {
            type: data[i].ReportTypeName,
            lat: Number(data[i].Latitude),
            lng: Number(data[i].Longitude),
            label: data[i].ReportId,
            name: data[i].ReportId,
            icon: data[i].ReportTypeName,
            id: Number(data[i].ReportId),
          };
          self.mapPlot.PlotZoneReports(itemData);
        }
      });
    } else {
      this.mapPlot.ClearZoneReports();
    }
  }

  CenterDefaultMap() {
    // this.gMap.panTo(this.globals.districtCenter);
    // this.gMap.setZoom(this.globals.districtZoom);
    // google.maps.event.trigger(this.gMap, "resize");
  }

  ZoomToPoint(point, zoom) {
    if (point == undefined) return;
    let latLng = new google.maps.LatLng(point.lat, point.lng);
    this.gMap.panTo(latLng);
    this.gMap.setZoom(zoom);
  }

  DisplayTrafficStatus(mode) {
    if (mode) {
      this.trafficLayer.setMap(this.gMap);
    } else {
      this.trafficLayer.setMap(null);
    }
  }
}
