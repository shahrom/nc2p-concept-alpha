/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: ViewState.js
 * Created: Thursday, 1st April 2021 11:58:12 am
 * Modified: Thursday, 1st April 2021 12:09:29 pm
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
      this.setOpen = false;
      this.setMode = "";
      this.setContent = "";
      instance = this;
    }
    return instance;
  }

  set bindOpen(state) {
    this.setOpen = state;
  }

  set bindContent(state) {
    this.setContent = state;
  }

  SetContent(type) {
    this.setContent(type);
  }

  SetOpen(mode) {
    this.setOpen(mode);
  }
}
