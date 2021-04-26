/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Crisis.js
 * Created: Sunday, 18th April 2021 6:35:12 am
 * Modified: Sunday, 18th April 2021 8:51:48 am
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
import ViewState from "./ViewState";

export default function Army() {
  // 1. UseState
  const [sliderIndex, setSliderIndex] = React.useState(1);
  const [updateData, setUpdateData] = React.useState(0);
  // 2. ViewState
  const viewState = new ViewState();
  viewState.bindIndex = setSliderIndex;
  viewState.bindUpdateData = setUpdateData;

  const handleSlideIndex = (index) => {
    setSliderIndex(index);
  };

  return (
    <div style={{ overflowY: "auto", height: window.innerHeight - 90 }}>
      <Grid container justify="center" spacing={5}>
        <Grid item md={4} xs={12}>
          <SideMenu handleSlideIndex={handleSlideIndex} />
        </Grid>
        <Grid item md={8} xs={12}>
          <Content updateData={updateData} sliderIndex={sliderIndex} />
        </Grid>
      </Grid>
    </div>
  );
}
