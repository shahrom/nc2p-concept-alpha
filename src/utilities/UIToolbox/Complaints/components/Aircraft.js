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
import BarChart from "./BarChart";
import CircularStatic from "./CircularStatic";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function VesselStatus(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div style={{ marginLeft: isMobile ? -90 : 50 }}>
      <div style={childrenSideBySideStyle}>
        <div style={{ width: isMobile ? 100 : 180 }} />
        <CircularStatic value={165} max={300} color={"orange"} label={"TOTAL 1ST LINE"} />
        <div style={{ width: 20 }} />
        <CircularStatic
          value={98}
          max={300}
          color={"#1BA716"}
          label={"TOTAL SERVICEABLE"}
        />
        <div style={{ width: 20 }} />
        <CircularStatic value={59.4} max={100} color={"red"} label={"% TOTAL 1ST LINE"} />
      </div>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
          marginLeft: -140,
        }}
      />

      <p style={{ color: "white", textAlign: "center", marginLeft: 0 }}>Aircraft Type</p>
      <div>
        <BarChart />
        <br />
        <br />
        <div
          style={{
            position: "relative",
            marginLeft: 260,
            marginTop: -380,
            opacity: 0.1,
          }}
        >
          <img
            src={"img/content/status/enforcement.png"}
            width="120px"
            height="auto"
            object-fit="contain"
          />
        </div>
      </div>
      <br />
    </div>
  );
}
