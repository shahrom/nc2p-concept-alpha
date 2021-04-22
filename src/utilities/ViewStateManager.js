/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: ViewStateManager.js
 * Created: Thursday, 25th March 2021 12:44:07 pm
 * Modified: Thursday, 25th March 2021 3:34:01 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

// componnets viewStates
import ContentState from "container/components/Content/ViewState";
import ReadinessState from "container/components/Content/components/Readiness/ViewState";
import NavyState from "container/components/Content/components/Navy/ViewState";
import ArmyState from "container/components/Content/components/Army/ViewState";
import FooterState from "container/components/Footer/ViewState";

let instance = null;

export default class ViewStateManager {
  constructor() {
    if (!instance) {
      // Register all the ViewState that needs to be accessed globaly
      this.contentState = new ContentState();
      this.dashboardState = new ReadinessState();
      this.navyState = new NavyState();
      this.crisisState = new ArmyState();
      this.footerState = new FooterState();

      window.MessageDispatcher.SubscribeDispatcher(
        "ViewStateManager",
        this.handleDispatchMessage
      );
      window.ViewStateManager = this;
      instance = this;
    }

    return instance;
  }

  handleDispatchMessage = (param) => {
    if (param.Receiver == "VIEW_STATE_MANAGER") {
      switch (param.Command) {
      }
    }
  };

  SetContent(type) {
    switch (type) {
      case "READINESS":
      case "INTELLIGENCE":
      case "PLANNING":
        this.contentState.SetContent("READINESS");
        break;
      default:
        this.contentState.SetContent(type);
        break;
    }

    this.footerState.Display(true);
    if (type === "COMMAND") this.footerState.Display(false);
  }

  DisplayArmyDetail(id) {
    this.crisisDetail.SetOpen(id);
  }

  DisplayZoneDetail(id) {
    this.navyDetail.SetOpen(id);
  }

  DisplayIVSSDetail(id) {
    this.ivssDetail.SetOpen(id);
  }

  DisplayITMSDetail(id) {
    this.itmsDetail.SetOpen(id);
  }

  DisplayIPDRSDetail(id) {
    this.ipdrsDetail.SetOpen(id);
  }

  DisplayIERSDetail(id) {
    this.iersDetail.SetOpen(id);
  }

  DisplayICMSDetail(id) {
    this.icmsDetail.SetOpen(id);
  }
}
