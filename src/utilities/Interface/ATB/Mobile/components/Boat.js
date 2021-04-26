/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: LeftDrawer.js
 * Created: Wednesday, 4th November 2020 2:08:25 pm
 * Modified: Thursday, 5th November 2020 1:32:22 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Grid from "@material-ui/core/Grid";

// component
import Vessel from "./Vessel";
import CircularStatic from "./CircularStatic";

export default function VesselStatus(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div style={{ padding: 30 }}>
      <Grid container justify="center" spacing={5}>
        <Grid item>
          <CircularStatic
            value={70.8}
            max={100}
            color={"cyan"}
            label={"ROVER"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={77.8}
            max={100}
            color={"cyan"}
            label={"BARACUDA"}
          />
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={5}>
        <Grid item>
          <CircularStatic
            value={59.4}
            max={100}
            color={"cyan"}
            label={"RHIB"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={50.2}
            max={100}
            color={"cyan"}
            label={"VIPER"}
          />
        </Grid>
      </Grid>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
        }}
      />

      <Vessel />
    </div>
  );
}
