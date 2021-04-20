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
import Vessel from "./Vessel";
import CircularStatic from "./CircularStatic";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function VesselStatus(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div style={{ marginLeft: isMobile ? -30 : 80 }}>
      <div style={childrenSideBySideStyle}>
        <div style={{ width: 110 }} />
        <CircularStatic value={70.8} max={100} color={"cyan"} label={"ROVER"} />
        <div style={{ width: 50 }} />
        <CircularStatic value={77.8} max={100} color={"cyan"} label={"BARACUDA"} />
        <div style={{ width: 50 }} />
        <CircularStatic value={59.4} max={100} color={"cyan"} label={"RHIB"} />
        <div style={{ width: 50 }} />
        <CircularStatic value={50.2} max={100} color={"cyan"} label={"VIPER"} />
      </div>

      <div>
        <Vessel />
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
