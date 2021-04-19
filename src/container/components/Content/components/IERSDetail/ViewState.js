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
      this.setOpen = false;
      this.setId = 0;
      this.open = false;
      instance = this;
    }
    return instance;
  }

  // 2. Binding
  set bindSetOpen(state) {
    this.setOpen = state;
  }

  set bindSetId(state) {
    this.setId = state;
  }

  set bindOpen(value) {
    this.open = value;
  }

  // 3. Public Functions
  SetOpen(id) {
    this.setId(id);
    this.setOpen(!this.open);
  }

  Hide() {
    this.setOpen(false);
  }
}
