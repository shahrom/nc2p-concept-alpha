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
import Menu1 from "./components/Menu1";
import Menu2 from "./components/Menu2";
import Menu3 from "./components/Menu3";
import Menu4 from "./components/Menu4";
import ViewState from "./ViewState";

export default function Crisis() {
  // 1. UseState
  const [display, setDisplay] = React.useState("block");
  const [sliderIndex, setSliderIndex] = React.useState(1);
  // 2. ViewState
  const viewState = new ViewState();
  viewState.bindIndex = setSliderIndex;
  viewState.bindDisplay = setDisplay;

  const handleMoreInfo = (index) => {
    setSliderIndex(index);
  };

  return (
    // <Container maxWidth="xl" style={{ marginTop: 100 }}>
    <div style={{ overflowY: "auto", height: window.innerHeight - 90 }}>
      <Grid container justify="center" spacing={5}>
        <Grid item md={3} xs={12}>
          <Menu1 handleMoreInfo={handleMoreInfo} />
        </Grid>
        <Grid item md={3} xs={12}>
          <Menu2 handleMoreInfo={handleMoreInfo} />
        </Grid>
        <Grid item md={3} xs={12}>
          <Menu3 handleMoreInfo={handleMoreInfo} />
        </Grid>
        <Grid item md={3} xs={12}>
          <Menu4 handleMoreInfo={handleMoreInfo} />
        </Grid>
      </Grid>
    </div>
    // </Container>
  );
}
