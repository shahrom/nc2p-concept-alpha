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
import ACCBarChart from "./ACCBarChart";
import CircularStatic from "./CircularStatic";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function VesselStatus(props) {
  const MyListItem = (props) => (
    <div
      style={{
        margin: 10,
        textAlign: "center",
        width: 100,
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

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div style={{ marginLeft: isMobile ? -20 : 200 }}>
      <div style={childrenSideBySideStyle}>
        <div style={{ width: 110 }} />
        <CircularStatic value={25} max={100} color={"red"} label={"RADAR SPEXER"} />
        <div style={{ width: 50 }} />
        <CircularStatic value={100} max={100} color={"#1BA716"} label={"RADAR 1206"} />
      </div>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
          marginLeft: -140,
        }}
      />

      <p style={{ color: "white", textAlign: "center", marginLeft: -30 }}>
        RADAR LOCATION
      </p>
      <p style={{ color: "green", textAlign: "left", marginLeft: 0 }}>Operational</p>
      <p style={{ color: "orange", textAlign: "left", marginLeft: 0 }}>Limited</p>

      <div>
        <ACCBarChart />
      </div>
      <br />
    </div>
  );
}
