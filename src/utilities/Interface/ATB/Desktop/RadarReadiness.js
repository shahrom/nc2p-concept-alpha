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

// component
import ACCBarChart from "./components/ACCBarChart";
import CircularStatic from "./components/CircularStatic";
import Grid from "@material-ui/core/Grid";

export default function RadarReadiness(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Grid container justify={"center"}>
        <div style={childrenSideBySideStyle}>
          <CircularStatic
            value={25}
            max={100}
            color={"red"}
            label={"RADAR SPEXER"}
          />
          <div style={{ width: 50 }} />
          <CircularStatic
            value={100}
            max={100}
            color={"#1BA716"}
            label={"RADAR 1206"}
          />
        </div>
      </Grid>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
        }}
      />

      <p style={{ color: "white", textAlign: "center", marginLeft: 0 }}>
        RADAR LOCATION
      </p>
      <br />
      <br />
      <ACCBarChart />
    </div>
  );
}
