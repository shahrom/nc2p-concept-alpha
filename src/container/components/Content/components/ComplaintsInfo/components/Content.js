/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Statistics1.js
 * Created: Thursday, 1st April 2021 2:36:22 pm
 * Modified: Thursday, 1st April 2021 2:36:22 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import Statistics from "utilities/UIToolbox/ComplaintsInfo/Statistics";

export default function Content(props) {
  return (
    <div
      style={{
        height: 730,
        width: "100%",
      }}
    >
      <Statistics />
      {/* <div>
        <img
          src={"img/content/complaints/screen1.png"}
          width="100%"
          height="auto"
          object-fit="contain"
        />
      </div> */}
    </div>
  );
}
