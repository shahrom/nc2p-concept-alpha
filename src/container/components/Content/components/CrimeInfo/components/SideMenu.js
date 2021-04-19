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
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import MobileMenu from "utilities/UIToolbox/CrimeInfo/MobileMenu";
import Menu from "utilities/UIToolbox/CrimeInfo/Menu";

export default function SideMenu(props) {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div>
      {isMobile ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <MobileMenu handleDetailIndex={props.handleDetailIndex} />
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            width: 400,
          }}
        >
          <Menu handleDetailIndex={props.handleDetailIndex} />
        </div>
      )}
    </div>
  );
}
