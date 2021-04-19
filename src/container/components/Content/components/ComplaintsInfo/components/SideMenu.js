/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: SideMenu.js
 * Created: Thursday, 1st April 2021 2:11:56 pm
 * Modified: Friday, 2nd April 2021 3:02:27 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

// components
import Menu from "utilities/UIToolbox/ComplaintsInfo/Menu";

export default function SideMenu(props) {
  return (
    <div
      style={{
        height: 730,
        width: 440,
      }}
    >
      <Menu handleDetailIndex={props.handleDetailIndex} />
    </div>
  );
}
