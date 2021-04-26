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
import Vessel from "./VesselReadiness";
import CircularStatic from "./components/CircularStatic";
import Grid from "@material-ui/core/Grid";

export default function BoatReadiness(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <Grid container justify={"center"}>
        <div style={childrenSideBySideStyle}>
          <div style={{ width: 40 }} />
          <CircularStatic
            value={70.8}
            max={100}
            color={"cyan"}
            label={"ROVER"}
            percentage={true}
          />
          <div style={{ width: 50 }} />
          <CircularStatic
            value={77.8}
            max={100}
            color={"cyan"}
            label={"BARACUDA"}
            percentage={true}
          />
          <div style={{ width: 50 }} />
          <CircularStatic
            value={59.4}
            max={100}
            color={"cyan"}
            label={"RHIB"}
            percentage={true}
          />
          <div style={{ width: 50 }} />
          <CircularStatic
            value={50.2}
            max={100}
            color={"cyan"}
            label={"VIPER"}
            percentage={true}
          />
        </div>
      </Grid>

      <Grid container justify={"center"}>
        <Vessel />
      </Grid>
    </div>
  );
}
