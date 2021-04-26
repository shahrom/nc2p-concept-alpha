/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content1.js
 * Created: Thursday, 1st April 2021 2:36:22 pm
 * Modified: Thursday, 1st April 2021 2:36:22 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import Map from "utilities/Interface/Monitoring/Map";

export default function Content(props) {
  return (
    <div
      style={{
        height: window.innerHeight,
        width: window.innerWidth,
      }}
    >
      <Map />
      {/* <LeftPanel />
      <RightPanel /> */}

      {/* <iframe
        style={{
          position: "absolute",
          top: "120px",
          left: "0px",
          margin: "auto",
        }}
        is="x-frame-bypass"
        src={"http://115.133.238.21:97/react-arcgis/"}
        frameborder="0"
        width="100%"
        height={window.innerHeight - 100}
        scrolling="no"
      ></iframe> */}
    </div>
  );
}
