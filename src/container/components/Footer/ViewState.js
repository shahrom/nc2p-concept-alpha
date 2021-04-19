/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: Validation.js
 * Created: Wednesday, 28th October 2020 2:53:31 pm
 * Modified: Wednesday, 28th October 2020 2:53:31 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

let instance = null;
export default class ViewState {
  constructor() {
    if (!instance) {
      this.setOpen = false;
      instance = this;
    }
    return instance;
  }

  set bindSetOpen(state) {
    this.setOpen = state;
  }

  Display(mode) {
    this.setOpen(mode);
  }

  Hide() {
    this.setOpen(false);
  }
}
