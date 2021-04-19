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

// components
import Menu from "utilities/UIToolbox/ATB/Menu";

export default function SideMenu(props) {
  return (
    <Container maxWidth="md">
      <Menu handleSlideIndex={props.handleSlideIndex} />
    </Container>
  );
}
