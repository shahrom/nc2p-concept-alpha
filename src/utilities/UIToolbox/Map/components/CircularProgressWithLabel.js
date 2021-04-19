/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: CircularProgressWithLabel.js
 * Created: Monday, 1st March 2021 11:21:36 pm
 * Modified: Monday, 1st March 2021 11:21:36 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function CircularProgressWithLabel(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <CircularProgress
        style={{ color: "rgba(0,0,0,0.1)", position: "relative" }}
        variant="determinate"
        value={100}
        size={40}
        thickness={5}
      />
      <CircularProgress
        style={{ color: props.color, position: "absolute", margin: "0px 0px 0px -40px" }}
        variant="determinate"
        value={props.value}
        size={40}
        thickness={5}
      />
      <p
        style={{
          color: "black",
          fontSize: 14,
          marginTop: -32,
        }}
      >
        {props.value + "%"}
      </p>
      <p style={{ color: "black", fontSize: 11, marginLeft: 0 }}>{props.label}</p>
    </div>
  );
}
