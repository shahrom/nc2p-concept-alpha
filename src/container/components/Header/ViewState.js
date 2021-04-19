/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: HeaderState.js
 * Created: Sunday, 28th February 2021 1:23:47 am
 * Modified: Tuesday, 2nd March 2021 10:37:42 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import { createContext } from "react";
export const StateBinder = createContext(null);

let instance = null;
export default class ViewState {
  constructor() {
    if (!instance) {
      this.setOpen = null;
      this.setValue = null;
      instance = this;
    }
    return instance;
  }

  // Binding
  set bindSetOpen(state) {
    this.setOpen = state;
  }

  set bindSetValue(state) {
    this.setValue = state;
  }

  displayHeader(mode) {
    if (this.setOpen != null) this.setOpen(mode);
  }

  displayDetailStatus(index) {
    var param = {
      Receiver: "MAIN_MENU",
      Command: "SET_CONTENT",
      Data: index,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);

    var param = {
      Receiver: "DETAIL_STATUS",
      Command: "SET_CONTENT",
      Data: index,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);

    switch (index) {
      case 0:
        window.ViewStateManager.setContentMode("MAPBOX");
        break;

      case 1:
      case 2:
      case 3:
        window.ViewStateManager.setContentMode("MAP");
        break;

      case 5:
        window.ViewStateManager.setContentMode("STATISTICS");
        break;

      case 6:
        window.ViewStateManager.setContentMode("METEO");
        break;
    }

    window.ViewStateManager.clearMap();
  }
}
