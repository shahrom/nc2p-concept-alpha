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

// components
import SideMenu from "./components/SideMenu";
import Content from "./components/Content/Content";

export default function Airforce() {
  // 1. UseState
  const [sliderIndex, setSliderIndex] = React.useState(1);

  const handleSlideIndex = (index) => {
    setSliderIndex(index);
  };

  return (
    // This height: window.innerHeight - 90 enables it to scroll in mobile mode
    <div style={{ overflowY: "auto", height: window.innerHeight - 90 }}>
      <Grid container justify="center" spacing={5}>
        <Grid item md={4} xs={12}>
          <SideMenu handleSlideIndex={handleSlideIndex} />
        </Grid>
        <Grid item md={8} xs={12}>
          <Content sliderIndex={sliderIndex} />
        </Grid>
      </Grid>
    </div>
  );
}
