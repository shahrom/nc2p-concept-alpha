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
import ACCBarChart from "./ACCBarChart";
import CircularStatic from "./CircularStatic";

export default function VesselStatus(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <CircularStatic value={5} max={5} color={"orange"} label={"TOTAL"} />
        </Grid>
        <Grid item>
          <CircularStatic
            value={1}
            max={5}
            color={"#1BA716"}
            label={"SERVICEABLE"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={20}
            max={100}
            color={"red"}
            label={"% OVERALL"}
          />
        </Grid>
      </Grid>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
          marginLeft: -140,
        }}
      />

      <ACCBarChart />
    </div>
  );
}
