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
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import MobileContent from "utilities/UIToolbox/ATB/Mobile/Content";
import DesktopContent from "utilities/UIToolbox/ATB/Desktop/Content";

export default function Content(props) {
  // MediaQuery
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Container maxWidth="md">
      {isMobile ? (
        <MobileContent sliderIndex={props.sliderIndex} />
      ) : (
        <DesktopContent sliderIndex={props.sliderIndex} />
      )}
    </Container>
  );
}
