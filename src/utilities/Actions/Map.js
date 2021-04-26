/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Map.js
 * Created: Monday, 26th April 2021 2:48:45 pm
 * Modified: Monday, 26th April 2021 2:49:29 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * The objective is to have a common actions that does not have to be implemented here
 * but is able to be accessed from anywhere in the application
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

// componnets viewStates
import MapState from "container/components/Content/ViewState";

let instance = null;

export default class MapActions {
  constructor() {
    if (!instance) {
      // Register all the ViewState that needs to be accessed globaly
      this.mapState = new MapState();
      window.MapActions = this;
      instance = this;
    }

    return instance;
  }

  /* 
  Zoom to a location on the map
  param pos: Position of the zoom in Lat/Lng object
  param scale: The zoom scale when final location is finally rendered 
  */
  ZoomToLocation(pos, scale) {
    this.mapState.ZoomToLocation(pos, scale);
  }

  /* 
  Clear all symbols on the map
  */
  ClearAllSymbols() {
    this.mapState.ClearAllSymbols();
  }

  /* 
  Filter symbols and the display only the symbols on the map
  */
  FilterSymbols(type) {
    this.mapState.FilterSymbols(type);
  }
}
