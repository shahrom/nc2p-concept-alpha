/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: ViewState.js
 * Created: Tuesday, 6th April 2021 10:12:53 am
 * Modified: Tuesday, 6th April 2021 10:13:00 am
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
      this.setIndex = 0;
      this.setDisplay = "none";

      instance = this;
    }
    return instance;
  }

  // 2. Binding
  set bindIndex(state) {
    this.setIndex = state;
  }

  set bindDisplay(state) {
    this.setDisplay = state;
  }

  // 3. Public Functions
  Hide() {
    this.setDisplay = "none";
  }

  Display() {
    this.setDisplay = "block";
  }
}
