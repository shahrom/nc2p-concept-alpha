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
import { useMediaQuery } from "react-responsive";

// components
import Menu2 from "utilities/UIToolbox/Status/Menu2";

export default function Menu(props) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Menu2 handleSlideIndex={props.handleSlideIndex} />
    </div>
  );
}
