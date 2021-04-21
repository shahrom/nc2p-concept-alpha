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
import { ChartPie1 } from "./ChartPie";
import CircularStatic from "./CircularStatic";

export default function VesselStatus(props) {
  const MyListItem = (props) => (
    <div
      style={{
        margin: 2,
        textAlign: "center",
      }}
    >
      <div style={{ backgroundColor: props.color }}>
        <p
          style={{
            fontSize: "14px",
            color: "white",
            padding: 5,
          }}
        >
          {props.label}
        </p>
      </div>
      <div style={{ marginTop: -20 }}>{props.content}</div>
    </div>
  );

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div style={{ padding: 30 }}>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <CircularStatic
            value={82}
            max={100}
            color={"cyan"}
            label={"ARMADA"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={80}
            max={100}
            color={"cyan"}
            label={"MAWILLA 1"}
          />
        </Grid>
        <Grid item>
          <CircularStatic
            value={78}
            max={100}
            color={"cyan"}
            label={"MAWILLA 2"}
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

      <ChartPie1 />

      <Grid container justify="center">
        <div style={childrenSideBySideStyle}>
          <MyListItem
            label={"PATROL"}
            content={<p style={{ fontSize: 28, color: "white" }}>52</p>}
            color={"#0088FE"}
          />
          <MyListItem
            label={"SUPPORT"}
            content={<p style={{ fontSize: 28, color: "white" }}>107</p>}
            color={"#1BA716"}
          />
          <MyListItem
            label={"TRAINING"}
            content={<p style={{ fontSize: 28, color: "white" }}>62</p>}
            color={"orange"}
          />
          <MyListItem
            label={"STRIKE"}
            content={<p style={{ fontSize: 28, color: "white" }}>18</p>}
            color={"red"}
          />
        </div>
      </Grid>
      <br />
    </div>
  );
}
