/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: SideMenu.js
 * Created: Wednesday, 21st April 2021 9:15:25 pm
 * Modified: Wednesday, 21st April 2021 10:04:14 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import MobileMenu from "utilities/Interface/Army/Mobile/Menu";
import DesktopMenu from "utilities/Interface/Army/Desktop/Menu";

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
