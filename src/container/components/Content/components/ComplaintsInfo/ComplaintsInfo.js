/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Menu.js
 * Created: Thursday, 1st April 2021 2:06:06 pm
 * Modified: Thursday, 1st April 2021 2:06:41 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import SideMenu from "./components/SideMenu";
import Content from "./components/Content";
import ViewState from "./ViewState";

export default function ComplaintsInfo() {
  // 1. UseState
  const [display, setDisplay] = React.useState("block");
  const [sliderIndex, setSliderIndex] = React.useState(1);
  // 2. ViewState
  const viewState = new ViewState();
  viewState.bindIndex = setSliderIndex;
  viewState.bindDisplay = setDisplay;

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const handleDetailIndex = (index) => {
    window.ViewStateManager.DisplayCrisisDetail(index);
  };

  return (
    <div
      style={{
        height: window.innerHeight - 200,
        width: window.innerWidth - 0,
        marginTop: 10,
        display: display,
      }}
    >
      <div style={childrenSideBySideStyle}>
        <SideMenu handleDetailIndex={handleDetailIndex} />
        <Content />
      </div>
    </div>
  );
}
