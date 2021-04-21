/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Menu.js
 * Created: Thursday, 1st April 2021 2:06:06 pm
 * Modified: Thursday, 1st April 2021 2:06:41 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// components
import Menu1 from "./Menu1";
import Menu2 from "./Menu2";
import Menu3 from "./Menu3";
import Menu4 from "./Menu4";

export default function Crisis() {
  // 1. UseState
  const [display, setDisplay] = React.useState("block");
  const [sliderIndex, setSliderIndex] = React.useState(1);

  const handleMoreInfo = (index) => {
    setSliderIndex(index);
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Grid container justify="center" spacing={5}>
        <Grid item md={3} xs={6}>
          <Menu1 handleMoreInfo={handleMoreInfo} />
        </Grid>
        <Grid item md={3} xs={6}>
          <Menu2 handleMoreInfo={handleMoreInfo} />
        </Grid>
        <Grid item md={3} xs={6}>
          <Menu3 handleMoreInfo={handleMoreInfo} />
        </Grid>
        <Grid item md={3} xs={6}>
          <Menu4 handleMoreInfo={handleMoreInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}
