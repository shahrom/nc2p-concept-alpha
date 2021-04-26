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
import SwipeableViews from "react-swipeable-views";
import Container from "@material-ui/core/Container";

// components
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";

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
