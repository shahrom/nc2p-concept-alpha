/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content.js
 * Created: Monday, 19th April 2021 9:16:11 pm
 * Modified: Wednesday, 21st April 2021 10:05:07 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import MobileContent from "utilities/UIToolbox/Airforce/Mobile/Content";
import DesktopContent from "utilities/UIToolbox/Airforce/Desktop/Content";

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
