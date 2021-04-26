/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: SideMenu.js
 * Created: Monday, 19th April 2021 9:16:11 pm
 * Modified: Wednesday, 21st April 2021 10:04:12 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import MobileMenu from "utilities/Interface/Airforce/Mobile/Menu";
import DesktopMenu from "utilities/Interface/Airforce/Desktop/Menu";

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
