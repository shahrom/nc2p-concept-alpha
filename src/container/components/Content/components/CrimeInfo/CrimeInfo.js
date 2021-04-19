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
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import SideMenu from "./components/SideMenu";
import Content from "./components/Content";
import ViewState from "./ViewState";

export default function CrimeInfo() {
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

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div>
      <div style={childrenSideBySideStyle}>
        <SideMenu handleDetailIndex={handleDetailIndex} />
        <div style={{ display: isMobile ? "none" : "block" }}>
          <Content />
        </div>
      </div>
    </div>
  );
}
