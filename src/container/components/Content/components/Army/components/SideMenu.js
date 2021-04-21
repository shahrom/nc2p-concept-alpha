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
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import MobileMenu from "utilities/UIToolbox/Army/Mobile/Menu";
import DesktopMenu from "utilities/UIToolbox/Army/Desktop/Menu";

export default function SideMenu(props) {
  // MediaQuery
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Container maxWidth="md">
      {isMobile ? (
        <MobileMenu handleSlideIndex={props.handleSlideIndex} />
      ) : (
        <DesktopMenu handleSlideIndex={props.handleSlideIndex} />
      )}
    </Container>
  );
}
