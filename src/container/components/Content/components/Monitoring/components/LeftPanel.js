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
import Content from "utilities/UIToolbox/Monitoring/LeftPanel";

export default function LeftPanel(props) {
  return (
    <div
      style={{
        position: "absolute",
        width: 250,
        height: window.innerHeight,
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <Content />
    </div>
  );
}
