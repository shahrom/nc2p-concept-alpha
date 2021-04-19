/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: RightPanel.js
 * Created: Friday, 16th April 2021 1:13:47 pm
 * Modified: Friday, 16th April 2021 3:46:35 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import Content from "utilities/UIToolbox/Monitoring/RightPanel";

export default function RightPanel(props) {
  return (
    <div
      style={{
        position: "absolute",
        width: 350,
        height: window.innerHeight,
        marginLeft: window.innerWidth - 350,
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <Content />
    </div>
  );
}
