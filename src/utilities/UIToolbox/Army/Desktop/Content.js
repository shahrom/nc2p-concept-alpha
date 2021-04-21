/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content.js
 * Created: Wednesday, 21st April 2021 2:07:06 pm
 * Modified: Wednesday, 21st April 2021 2:07:06 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import SwipeableViews from "react-swipeable-views";
import Container from "@material-ui/core/Container";

// components
import Slide1 from "utilities/UIToolbox/ATB/Slide1";
import Slide2 from "utilities/UIToolbox/ATB/Slide2";

export default function Content(props) {
  return (
    <Container maxWidth="md">
      <SwipeableViews index={props.sliderIndex - 1}>
        <Slide1 />
        <Slide2 />
      </SwipeableViews>
    </Container>
  );
}
