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
import useMediaQuery from "@material-ui/core/useMediaQuery";

// component
import ACCBarChart from "./ACCBarChart";
import CircularStatic from "./CircularStatic";

export default function VesselStatus(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div style={{ marginLeft: isMobile ? 0 : 80 }}>
      <div>
        <div style={childrenSideBySideStyle}>
          <div style={{ width: isMobile ? 0 : 40 }} />
          <CircularStatic
            value={79.1}
            max={100}
            color={"orange"}
            label={"AVERAGE CAPABILITY"}
          />
          <div style={{ width: 50 }} />
          <CircularStatic
            value={88.9}
            max={100}
            color={"#1BA716"}
            label={"AVERAGE READINESS"}
          />
          <div style={{ width: 50 }} />
          <CircularStatic
            value={72.7}
            max={100}
            color={"orange"}
            label={"AVERAGE SERVICEABILITY"}
          />
        </div>
      </div>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
          marginLeft: -140,
        }}
      />

      <p style={{ color: "white", textAlign: "center", marginLeft: 0 }}>ELEMENTS</p>
      <div>
        <ACCBarChart />
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
