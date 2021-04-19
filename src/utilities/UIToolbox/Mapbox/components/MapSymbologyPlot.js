/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: MapSymbologyPlot.js
 * Created: Friday, 6th November 2020 3:41:28 pm
 * Modified: Friday, 6th November 2020 3:41:28 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

export default class MapSymbologyPlot {
  constructor(map) {
    this.gMap = map;
  }

  plotSingleMarker() {
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
      offset: [0, 0, 100],
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

  plotMarkers(id, list) {
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
      // The className is the marker icon
      var el = document.createElement("div");
      el.className = marker.properties.class;

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(content))
        .addTo(self.map);
    });
  }

  plotBoundary(id, points) {
    this.gMap.addLayer({
      id: id,
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: points,
          },
        },
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "purple",
        "line-width": 8,
        "line-opacity": 0.5,
      },
    });
  }

  plotRegion(id, points) {
    this.gMap.addLayer({
      id: id,
      type: "fill",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polyline",
            coordinates: points,
          },
        },
      },
      layout: {},
      paint: {
        "fill-outline-color": "#088",
        "fill-color": "#088",
        "line-color": "#088",
        "fill-opacity": 0,
      },
    });
  }
}
