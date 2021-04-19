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
import Map from "utilities/UIToolbox/CrimeInfo/Map/Map";

export default function Content(props) {
  return (
    <div
      style={{
        height: 730,
        width: "100%",
      }}
    >
      <Map width={window.innerWidth - 400} height={window.innerHeight - 90} />
    </div>
  );
}
