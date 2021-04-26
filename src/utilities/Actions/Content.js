/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content.js
 * Created: Monday, 26th April 2021 3:01:41 pm
 * Modified: Monday, 26th April 2021 3:01:50 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

// components viewStates
import ContentState from "container/components/Content/ViewState";
import FooterState from "container/components/Footer/ViewState";

let instance = null;

export default class ContentAction {
  constructor() {
    if (!instance) {
      this.contentState = new ContentState();
      this.footerState = new FooterState();

      window.ContentAction = this;
      instance = this;
    }
    return instance;
  }

  /* 
  [Desc]
  Clear the content and only display content selected by the Id
  [Param]
  id: the unique id for the function to be displayed and all other content is cleared
  */
  SetContent(id) {
    switch (id) {
      case "READINESS":
      case "INTELLIGENCE":
      case "PLANNING":
        this.contentState.SetContent("READINESS");
        break;
      default:
        this.contentState.SetContent(id);
        break;
    }

    this.footerState.Display(true);
    if (id === "COMMAND") this.footerState.Display(false);
  }
}
