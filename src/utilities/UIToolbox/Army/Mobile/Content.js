/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Content.js
 * Created: Wednesday, 21st April 2021 2:07:23 pm
 * Modified: Wednesday, 21st April 2021 2:07:23 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Container from "@material-ui/core/Container";

// components
import Slide1 from "./components/Slide1";

export default function Content(props) {
  return (
    <Container maxWidth="md">
      <SwipeableViews index={props.sliderIndex - 1}>
        <Slide1 updateData={props.updateData} />
      </SwipeableViews>
    </Container>
  );
}
