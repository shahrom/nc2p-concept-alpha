/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MapPatrol.js
 * Created: Sunday, 22nd November 2020 1:19:04 am
 * Modified: Sunday, 22nd November 2020 1:10:57 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

const google = window.google ? window.google : {};

export default class MapPatrol {
  constructor(map) {
    this.gMap = map;
    this.routeCallSignMarkers = [];
    this.routePathMarkers = [];

    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "js/v3_epoly.js";
    head.appendChild(script);
  }

  ListenPlotRoute = (mode) => {
    var self = this;

    if (mode == false) {
      self.routePathMarkers.forEach(function (marker) {
        marker.setMap(null);
      });
    } else {
      self.routePathMarkers.forEach(function (marker) {
        marker.setMap(self.gMap);
      });
    }
  };

  ListenClearRoute = (callSign) => {
    var self = this;

    for (var i = 0; i < self.routePathMarkers.length; i++) {
      if (self.routePathMarkers[i].id == callSign) {
        self.routePathMarkers[i].setMap(null);
      }
    }

    for (var i = 0; i < self.routeCallSignMarkers.length; i++) {
      if (self.routeCallSignMarkers[i].id == callSign) {
        self.routeCallSignMarkers[i].setMap(null);
      }
    }
  };

  CalculateRoute(origin, destination, speed, id) {
    var directionsService = new google.maps.DirectionsService();

    var request = {
      origin: origin,
      destination: destination,
      // waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    var self = this;
    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        self.PlotCalculatedRoute(
          self.gMap,
          result.routes[0].overview_path,
          destination,
          id
        );
        // self.GetRouteInfo(result.routes[0]);
      }
    });
  }

  PlotCalculatedRoute(map, pathCoords, destination, id) {
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
      strokeColor: "blue",
      strokeOpacity: 0.4,
      editable: false,
      map: map,
      id: id,
    });

    // Info Window
    var routeInfowindow = new google.maps.InfoWindow({
      maxWidth: 400,
      maxHeight: 200,
    });

    var time;
    var avgSpeed = "3.6";

    route.addListener("click", function (event) {
      var contentString =
        '<div id="MapInfoWindow" style="color:black;font-size: 90%" >' +
        "<table>" +
        "<tr>" +
        "<td>Average Speed</td>" +
        "<td>" +
        avgSpeed +
        " km</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Total Distance</td>" +
        "<td>" +
        (route.Distance() / 1000).toFixed(2) +
        " km</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Total Time</td>" +
        "<td>" +
        (time / 1000).toFixed(2) +
        " min </td>" +
        "</tr>" +
        "</table>" +
        "</div>";

      routeInfowindow.setContent(contentString);
      routeInfowindow.setPosition(event.latLng);
      routeInfowindow.open(self.gMap, route);
    });

    eol = route.Distance();

    var mpv = {
      url: "img/icons/mpv_blue_64.png",
      scaledSize: new google.maps.Size(64, 64),
      size: new google.maps.Size(64, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32, 64),
      labelOrigin: new google.maps.Point(32, -10),
    };

    var urb = {
      url: "img/icons/urb_blue_64.png",
      size: new google.maps.Size(64, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32, 64),
      labelOrigin: new google.maps.Point(32, -10),
    };

    var mob = {
      url: "img/icons/mob_blue_64.png",
      size: new google.maps.Size(64, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32, 64),
      labelOrigin: new google.maps.Point(32, -10),
    };

    // Create Marker
    var marker = new google.maps.Marker({
      position: destination,
      map: this.gMap,
      icon: mpv,
      label: {
        text: "MPV2",
        color: "blue",
        fontSize: "11px",
        fontWeight: "bold",
      },
      id: "MPV2",
      zIndex: 1,
    });

    // Info Window
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 400,
      maxHeight: 200,
    });

    var self = this;
    marker.addListener("click", function () {
      var contentString =
        '<div id="MapInfoWindow" style="color:black;font-size: 90%" >' +
        "<h5>" +
        marker.id +
        "</h5>" +
        "<table>" +
        "<tr>" +
        "<td>Status</td>" +
        "<td>Patrol</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Course</td>" +
        "<td><div  id=" +
        marker.id +
        '_course style="color:black;font-size: 100%;">North</div></td>' +
        "</tr>" +
        "<tr>" +
        "<td>Speed</td>" +
        "<td>" +
        avgSpeed +
        " km/h</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Lat/Long</td>" +
        "<td><div id=" +
        marker.id +
        ' style="color:black;font-size: 100%;"></div></td>' +
        "</tr>" +
        "</table>" +
        "</div>";

      infowindow.setContent(contentString);
      infowindow.open(self.map, marker);
    });

    // Route Animation
    // var animateRoute = new AnimateRoute(route, eol, marker, speed, id, 1);
    // this.routePathMarkers.push(route);
    // this.routeCallSignMarkers.push(marker);

    // for (var i = 0; i < this.globals.RouteList.length; i++) {
    //   if (
    //     this.globals.RouteList[i].CallSign == this.globals.RouteInfo.CallSign
    //   ) {
    //     this.globals.RouteList[i].RouteCreated = true;
    //     this.globals.RouteList[i].AnimatedRoute = animateRoute;

    //     // Auto start/stop animation
    //     this.globals.RouteList[i].RouteStatus = "STOP";
    //     this.globals.RouteList[i].AnimatedRoute.Stop();
    //     // this.globals.RouteList[i].RouteStatus = 'ACTIVE';
    //     // this.globals.RouteList[i].AnimatedRoute.Start();

    //     this.globals.TriggerUpdateRouteList();
    //     break;
    //   }
    // }
  }

  GetRouteInfo(route) {
    var totalDistance = 0;
    var totalDuration = 0;
    var legs = route.legs;
    for (var i = 0; i < legs.length; ++i) {
      totalDistance += legs[i].distance.value;
      totalDuration += legs[i].duration.value;
    }

    var distance = totalDistance / 1000;
    var duration = Math.round(totalDuration / 60);

    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;

    // $('.convertedHour').html(hours);
    // $('.convertedMin').html(minutes);

    // analysisData = [];
    // analysisData.push(distance.toFixed(2) +' km');
    // analysisData.push(hours + ' jam '+ minutes + ' minit');
    // analysisData.push(legs.length - 1);

    // var maxDuration = ((legs.length - 1) * 15) + Math.round( totalDuration / 60 );
    // var hours = Math.floor( maxDuration / 60);
    // var minutes = maxDuration % 60;
    // analysisData.push(hours + ' jam '+ minutes + ' minit');

    return totalDuration / 60 + " minutes";
  }
}

/*

3.
  // var circle = new google.maps.Circle({
      //   strokeColor: '#FFFFFF',
      //   strokeOpacity: 1.8,
      //   strokeWeight: 2,
      //   fillColor: '#FF0000',
      //   fillOpacity: 0.2,
      //   map: map,
      //   radius: 50,
      // });
      // circle.bindTo('center', marker, 'position');

2.
// PlotCalculatedRouteXXX(map, pathCoords, speed, index) {

  //     var i, marker, route, eol ;
      
  //     route = new google.maps.Polyline({
  //         path: pathCoords,
  //         geodesic : true,
  //         strokeColor: '#FF0000',
  //         strokeOpacity: 0.4,
  //         strokeWeight: 5,
  //         editable: false,
  //         map:map
  //     });

  //     eol=route.Distance();
  //     this.stepArray[index] = 1;
      
  //     var marker = new google.maps.Marker({map:map, icon:"img/mob_icon32_blue.png"});
      
  //     var self = this;
  //     var mainTimer = setInterval(function() {
  //       self.Animate(route, eol, marker, speed, index);
  //     }, 1000);
  // };

  // AnimateXXX(route, eol, marker, speed, index) {
 
  //     var d = speed * this.stepArray[index]++;

  //     if (d<eol) {
  //       var p = route.GetPointAtDistance(d);
  //       marker.setPosition(p);
  //     } else {
  //       this.stepArray[index] = 0;        
  //     }
      
  // };


1.
document.getElementById('analize-route').onclick = function() {
      
        // Initialization =======================================
        // map360.ClearMap();
        // map360.InitMap(gMap.getCenter().lat(),gMap.getCenter().lng(),gMap.getZoom());
        map360.InitMap(3.197053639499912,101.74253135919571,17);

        var waypts_mtlsheloc = [];
        var pts = mainDataset.SasaranList();
        var filterPts = [];

        // Filter list
        var checkedBoxes = document.querySelectorAll('input[name=target-bank]:checked');

        for (var p = 0; p < checkedBoxes.length; p++) {
          for (var i = 0; i < pts.length; i++) {
            if (pts[i][5] == checkedBoxes[p].value){
              filterPts.push(pts[i]);
              waypts_mtlsheloc.push({
                location: new google.maps.LatLng(pts[i][1],pts[i][2])
              }); 
            }
          }  
        } 
        
        map360.PlotMarkers(filterPts);

        var origin = new google.maps.LatLng(pts[0][1],pts[0][2]);
        var destination = new google.maps.LatLng(pts[0][1],pts[0][2]);
        animate360.StopMainTimer();
        animate360.CalculateRoute(gMap, origin, destination, 5,1, waypts_mtlsheloc);

      }


*/
