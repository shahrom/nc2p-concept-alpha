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
import ACCBarChart from "./components/ACCBarChart";
import CircularStatic from "./components/CircularStatic";

export default function Summary(props) {
  return (
    <div style={{ padding: 30 }}>
      <Grid container justify="center" spacing={5}>
        <Grid item>
          <CircularStatic
            value={(79.1 - props.updateData).toFixed(1)}
            max={100}
            color={"orange"}
            label={"CAPABILITY"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={(88.9 - props.updateData).toFixed(1)}
            max={100}
            color={"#1BA716"}
            label={"READINESS"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={(72.7 - props.updateData).toFixed(1)}
            max={100}
            color={"orange"}
            label={"SERVICEABILITY"}
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

      <ACCBarChart updateData={props.updateData} />
      <br />
    </div>
  );
}
