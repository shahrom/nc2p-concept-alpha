import Globals from "utilities/Globals";

const google = window.google ? window.google : {};

export default class AnimateRoute {
  constructor(route, eol, marker, speed, index, patrolTypeId) {
    this.mode = "PATROL";
    this.eolReturn = 0;
    this.returnPath = null;
    this.eolRoute = 0;
    this.dispatchPath = null;
    this.mainTimer = {};
    this.start = false;
    this.bypass = false;
    this.p = null;

    this.Animate(route, eol, marker, speed, index, patrolTypeId);

    this.globals = new Globals();
  }

  Animate(route, eol, marker, speed, index, patrolTypeId) {
    var count = 0;
    var count2 = 0;
    var count3 = 0;
    var self = this;
    this.mainTimer = setInterval(function () {
      if (self.start) {
        if (self.mode == "PATROL") {
          // Patrol

          var d = speed * count++;

          if (d < eol) {
            var p = route.GetPointAtDistance(d);

            // Get Course
            if (self.p != null) {
              var angleDeg =
                (Math.atan2(self.p.lat() - p.lat(), self.p.lng() - p.lng()) *
                  180) /
                Math.PI;
              var course;

              // angleDeg = Math.abs(angleDeg)
              var x = angleDeg.toFixed(0);
              switch (true) {
                case x >= -180 && x < -90:
                  course = "North East";
                  break;
                case x >= -90 && x < 0:
                  course = "North West";
                  break;
                case x >= 0 && x < 90:
                  course = "South West";
                  break;
                case x >= 90 && x < 180:
                  course = "South East";
                  break;
              }
            }

            self.p = p;
            marker.setPosition(p);
            marker.setVisible(self.bypass);
            // self.globals.TriggerPlotCameraByBoundary(p);

            if (document.getElementById(marker.id + "_course") !== null) {
              document.getElementById(marker.id + "_course").innerHTML =
                "<span>" + course + " </span>";
            }

            if (document.getElementById(marker.id) !== null) {
              document.getElementById(marker.id).innerHTML =
                "<span>" +
                p.lat().toFixed(4) +
                "," +
                p.lng().toFixed(4) +
                " </span>";
            }

            var displaySpeed;
            if (patrolTypeId == 1) displaySpeed = "3.6";
            if (patrolTypeId == 2) displaySpeed = "45";
            if (patrolTypeId == 3) displaySpeed = "65";

            var track =
              "WSGW~|'PATROL~|'trackSIM~|'{" +
              '"CallSign":"' +
              marker.id +
              '",' +
              '"PatrolTypeId":' +
              patrolTypeId +
              "," +
              '"Altitude":0,' +
              '"Course":"' +
              course +
              '",' +
              '"Speed":"' +
              displaySpeed +
              ' km/h",' +
              '"Latitude":' +
              p.lat() +
              "," +
              '"Longitude":' +
              p.lng() +
              "," +
              '"ByPass":' +
              self.bypass +
              "," +
              '"Status":"On"}';

            self.globals.SocketConnection.send(track);
          } else {
            count = 0;
          }
        }

        if (self.mode == "DISPATCH") {
          // Dispatch
          var d = speed * count2++;

          if (d < self.eolRoute) {
            var p = self.dispatchPath.GetPointAtDistance(d);
            self.p = p;
            marker.setPosition(p);
            marker.setVisible(self.bypass);
            self.globals.TriggerPlotCameraByBoundary(p);
            var track =
              "WSGW~|'PATROL~|'trackSIM~|'{" +
              '"CallSign":"' +
              marker.id +
              '",' +
              '"Altitude":0,' +
              '"Course":0,' +
              '"Speed":0,' +
              '"Latitude":' +
              p.lat() +
              "," +
              '"Longitude":' +
              p.lng() +
              "," +
              '"ByPass":"' +
              self.bypass +
              '",' +
              '"Status":"On"}';

            self.globals.SocketConnection.send(track);
          } else {
            self.mode = "RETURN";
            count2 = 0;
          }
        }

        if (self.mode == "RETURN") {
          // Return

          var d = speed * count3++;

          if (d < self.eolRoute) {
            var p = self.returnPath.GetPointAtDistance(d);
            self.p = p;
            marker.setPosition(p);
            marker.setVisible(self.bypass);
            self.globals.TriggerPlotCameraByBoundary(p);
            var track =
              "WSGW~|'PATROL~|'trackSIM~|'{" +
              '"CallSign":"' +
              marker.id +
              '",' +
              '"Altitude":0,' +
              '"Course":0,' +
              '"Speed":0,' +
              '"Latitude":' +
              p.lat() +
              "," +
              '"Longitude":' +
              p.lng() +
              "," +
              '"ByPass":"' +
              self.bypass +
              '",' +
              '"Status":"On"}';

            self.globals.SocketConnection.send(track);
          } else {
            self.mode = "PATROL";
            count3 = 0;
          }
        }
      } else {
        if (this.p != undefined) {
          var track =
            "WSGW~|'PATROL~|'trackSIM~|'{" +
            '"CallSign":"' +
            marker.id +
            '",' +
            '"Altitude":0,' +
            '"Course":0,' +
            '"Speed":0,' +
            '"Latitude":' +
            this.p.lat() +
            "," +
            '"Longitude":' +
            this.p.lng() +
            "," +
            '"ByPass":"' +
            self.bypass +
            '",' +
            '"Status":"Off"' +
            "}";
          self.globals.SocketConnection.send(track);
        }
      }
    }, 2000);
  }

  GetPathVariableCode(line) {
    var pathArr = line.getPath();
    var reversePath = [];
    for (var i = pathArr.length - 1; i >= 0; i--) {
      reversePath.push({
        lat: pathArr.getAt(i).lat(),
        lng: pathArr.getAt(i).lng(),
      });
    }

    var route = new google.maps.Polyline({
      path: reversePath,
      geodesic: true,
    });

    return route;
  }

  ReturnToPatrol(path) {
    this.mode = "RETURN";
  }

  DispatchRoute(path) {
    this.mode = "DISPATCH";
    this.dispatchPath = path;
    this.eolRoute = path.Distance();

    // Generate return path
    this.returnPath = this.GetPathVariableCode(path);
    this.eolReturn = path.Distance();
  }

  Start() {
    this.start = true;
  }

  ByPass() {
    if (this.bypass) {
      this.bypass = false;
    } else {
      this.bypass = true;
    }
  }

  Stop() {
    this.start = false;
  }

  Clear() {
    clearInterval(this.mainTimer);
  }
}
