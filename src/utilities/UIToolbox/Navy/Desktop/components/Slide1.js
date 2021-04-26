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
import Vessel from "./Vessel";
import { FitToViewport } from "react-fit-to-viewport";
import Grid from "@material-ui/core/Grid";

export default function Slide1(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(17,21,30,0.5)",
        height: 700,
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 20,
            color: "white",
            backgroundColor: "#0B3B84",
          }}
        >
          FULL MISSION CAPABLE (CAT 1 & 2)
        </p>
        <Grid container justify={"center"}>
          <FitToViewport
            width={1600}
            height={700}
            minZoom={0.5}
            maxZoom={1}
            style={{ overflow: "hidden" }}
          >
            <Vessel />
          </FitToViewport>
        </Grid>
      </div>
    </div>
  );
}
