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
import Content2 from "./Content2";
import { FitToViewport } from "react-fit-to-viewport";
import Grid from "@material-ui/core/Grid";

export default function Slide2(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(17,21,30,0.5)",
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 28,
            color: "white",
            backgroundColor: "#0B3B84",
          }}
        >
          SLIDE 2
        </p>
        <Grid container justify={"center"}>
          <FitToViewport
            width={1600}
            height={700}
            minZoom={0.5}
            maxZoom={1}
            style={{ overflow: "hidden" }}
          >
            <Content2 />
          </FitToViewport>
        </Grid>
      </div>
    </div>
  );
}
