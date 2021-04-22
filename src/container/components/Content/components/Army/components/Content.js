/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content.js
 * Created: Wednesday, 21st April 2021 9:15:25 pm
 * Modified: Wednesday, 21st April 2021 10:05:13 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import MobileContent from "utilities/UIToolbox/Army/Mobile/Content";
import DesktopContent from "utilities/UIToolbox/Army/Desktop/Content";

export default function Content(props) {
  // MediaQuery
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Container maxWidth="md">
      {isMobile ? (
        <MobileContent
          updateData={props.updateData}
          handleSlideIndex={props.handleSlideIndex}
        />
      ) : (
        <DesktopContent
          updateData={props.updateData}
          handleSlideIndex={props.handleSlideIndex}
        />
      )}
    </Container>
  );
}
