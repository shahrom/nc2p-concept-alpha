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
import StatusState from "container/components/Content/components/Status/ViewState";
import CrimeState from "container/components/Content/components/Crime/ViewState";
import ArmyState from "container/components/Content/components/Army/ViewState";
import FooterState from "container/components/Footer/ViewState";

// import ArmyDetail from "container/components/Content/components/ArmyDetail/ViewState";
import CrimeDetail from "container/components/Content/components/CrimeDetail/ViewState";

import IVSSDetail from "container/components/Content/components/IVSSDetail/ViewState";
import ITMSDetail from "container/components/Content/components/ITMSDetail/ViewState";
import ICMSDetail from "container/components/Content/components/ICMSDetail/ViewState";
import IPDRSDetail from "container/components/Content/components/IPDRSDetail/ViewState";
import IERSDetail from "container/components/Content/components/IERSDetail/ViewState";

let instance = null;

export default class ViewStateManager {
  constructor() {
    if (!instance) {
      // Register all the ViewState that needs to be accessed globaly
      this.contentState = new ContentState();
      this.dashboardState = new StatusState();
      this.crimeState = new CrimeState();
      this.crisisState = new ArmyState();
      this.footerState = new FooterState();
      // this.crisisDetail = new ArmyDetail();
      this.crimeDetail = new CrimeDetail();

      this.ivssDetail = new IVSSDetail();
      this.itmsDetail = new ITMSDetail();
      this.icmsDetail = new ICMSDetail();
      this.ipdrsDetail = new IPDRSDetail();
      this.iersDetail = new IERSDetail();

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
    this.contentState.SetContent(type);
    this.footerState.Display(true);
    if (type === "STATUS-INFO") this.footerState.Display(false);
    if (type === "CRISIS-INFO") this.footerState.Display(false);
    if (type === "CRIME-INFO") this.footerState.Display(false);
    if (type === "COMPLAINTS-INFO") this.footerState.Display(false);
    if (type === "MONITORING") this.footerState.Display(false);
  }

  DisplayArmyDetail(id) {
    this.crisisDetail.SetOpen(id);
  }

  DisplayZoneDetail(id) {
    this.crimeDetail.SetOpen(id);
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
