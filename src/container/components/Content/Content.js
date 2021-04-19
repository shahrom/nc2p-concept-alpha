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
import Container from "@material-ui/core/Container";
import { useMediaQuery } from "react-responsive";

// components
import ViewState from "./ViewState";
import Status from "./components/Status/Status";
import Crime from "./components/Crime/Crime";
import Army from "./components/Army/Army";
import Complaints from "./components/Complaints/Complaints";
import ATB from "./components/ATB/ATB";

import CrimeInfo from "./components/CrimeInfo/CrimeInfo";
// import ArmyInfo from "./components/ArmyInfo/ArmyInfo";
import ComplaintsInfo from "./components/ComplaintsInfo/ComplaintsInfo";
import Monitoring from "./components/Monitoring/Monitoring";

// import ArmyDetail from "./components/ArmyDetail/ArmyDetail";
import CrimeDetail from "./components/CrimeDetail/CrimeDetail";

import IVSSDetail from "./components/IVSSDetail/IVSSDetail";
import ITMSDetail from "./components/ITMSDetail/ITMSDetail";
import ICMSDetail from "./components/ICMSDetail/ICMSDetail";
import IPDRSDetail from "./components/IPDRSDetail/IPDRSDetail";
import IERSDetail from "./components/IERSDetail/IERSDetail";

export default function MainContainerView() {
  // 1
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState("STATUS");

  // 2
  const viewState = new ViewState();
  viewState.bindOpen = setOpen;
  viewState.bindContent = setContent;

  const handleMediaQueryChange = (matches) => {
    // if (isPortrait) window.location.reload();
  };
  const isPortrait = useMediaQuery(
    { orientation: "portrait" },
    undefined,
    handleMediaQueryChange
  );

  const CurrentDisplay = (content) => (
    <div>
      <p>Testing</p>
    </div>
  );

  const SaveComponent = (props) => {
    return (
      <div>
        <p>
          <input onChange={props.handleChange} value={props.text} />
        </p>
        <button onClick={props.handleSave}>Save</button>
      </div>
    );
  };

  var selectedDisplay;
  switch (content) {
    case "STATUS":
      selectedDisplay = <Status />;
      break;
    case "CRIME":
      selectedDisplay = <Crime />;
      break;
    case "CRIME-INFO":
      selectedDisplay = (
        <div>
          <CrimeInfo />
          <CrimeDetail />
        </div>
      );
      break;
    case "ARMY":
      selectedDisplay = <Army />;
      break;

    case "COMPLAINTS":
      selectedDisplay = <Complaints />;
      break;
    case "ATB":
      selectedDisplay = <ATB />;
      break;
    case "COMPLAINTS-INFO":
      selectedDisplay = <ComplaintsInfo />;
      break;
    case "MONITORING":
      selectedDisplay = (
        <div>
          <Monitoring />
          <IVSSDetail />
          <ITMSDetail />
          <IERSDetail />
          <ICMSDetail />
          <IPDRSDetail />
        </div>
      );
      break;
  }

  return <div>{selectedDisplay}</div>;
}

// Reference on using &&. This is probably the most efficient way to display and hide a component
// https://www.pluralsight.com/guides/how-to-show-and-hide-reactjs-components
// Short-circuit AND operator (&&)
// https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e/
