/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MainContainerView.js
 * Created: Thursday, 25th March 2021 12:44:07 pm
 * Modified: Thursday, 25th March 2021 3:28:50 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { useMediaQuery } from "react-responsive";

// components
import ViewState from "./ViewState";
import Readiness from "./components/Readiness/Readiness";
import Navy from "./components/Navy/Navy";
import Army from "./components/Army/Army";
import Airforce from "./components/Airforce/Airforce";
import ATB from "./components/ATB/ATB";
import Monitoring from "./components/Monitoring/Monitoring";

export default function Content() {
  // 1
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState("STATUS");

  // 2
  const viewState = new ViewState();
  viewState.bindOpen = setOpen;
  viewState.bindContent = setContent;

  var selectedDisplay;
  switch (content) {
    case "STATUS":
      selectedDisplay = <Readiness />;
      break;
    case "NAVY":
      selectedDisplay = <Navy />;
      break;
    case "ARMY":
      selectedDisplay = <Army />;
      break;
    case "AIRFORCE":
      selectedDisplay = <Airforce />;
      break;
    case "ATB":
      selectedDisplay = <ATB />;
      break;
    case "COMMAND":
      selectedDisplay = (
        <div>
          <Monitoring />
        </div>
      );
      break;
  }

  return <div>{selectedDisplay}</div>;
}
