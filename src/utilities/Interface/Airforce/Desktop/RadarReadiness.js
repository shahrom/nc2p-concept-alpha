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

export default function RadarReadiness(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <div style={childrenSideBySideStyle}>
        <div style={{ width: 120 }} />
        <CircularStatic
          value={5}
          max={5}
          color={"orange"}
          label={"TOTAL RADAR"}
        />
        <div style={{ width: 20 }} />
        <CircularStatic
          value={1}
          max={5}
          color={"#1BA716"}
          label={"TOTAL SERVICEABLE"}
        />
        <div style={{ width: 20 }} />
        <CircularStatic
          value={20}
          max={100}
          color={"red"}
          label={"% OVERALL"}
        />
      </div>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
        }}
      />

      <p style={{ color: "white", textAlign: "center", marginLeft: -30 }}>
        RADAR LOCATION
      </p>
      <ACCBarChart />
    </div>
  );
}
