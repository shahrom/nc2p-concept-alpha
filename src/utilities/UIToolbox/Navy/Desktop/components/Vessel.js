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
import { ChartPie1 } from "./ChartPie";
import CircularStatic from "./CircularStatic";

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

  return (
    <div style={{ marginLeft: 150 }}>
      <div style={childrenSideBySideStyle}>
        <div style={{ width: 110 }} />
        <CircularStatic value={82} max={100} color={"cyan"} label={"ARMADA"} />
        <div style={{ width: 50 }} />
        <CircularStatic value={80} max={100} color={"cyan"} label={"MAWILLA 1"} />
        <div style={{ width: 50 }} />
        <CircularStatic value={78} max={100} color={"cyan"} label={"MAWILLA 2"} />
      </div>

      <hr
        style={{
          backgroundColor: "gray",
          margin: 30,
          opacity: 0.2,
          marginLeft: -140,
        }}
      />
      <p
        style={{
          color: "white",
          textAlign: "center",
          marginLeft: -130,
        }}
      >
        TOTAL VESSEL READINESS
      </p>
      <br />
      <div>
        <ChartPie1 />
      </div>
      <div style={{ marginLeft: 60 }}>
        <div style={childrenSideBySideStyle}>
          <MyListItem
            label={"PATROL"}
            content={<p style={{ fontSize: 32, color: "white" }}>52</p>}
            color={"#0088FE"}
          />
          <MyListItem
            label={"SUPPORT"}
            content={<p style={{ fontSize: 32, color: "white" }}>107</p>}
            color={"#1BA716"}
          />
          <MyListItem
            label={"TRAINING"}
            content={<p style={{ fontSize: 32, color: "white" }}>62</p>}
            color={"orange"}
          />
          <MyListItem
            label={"STRIKE"}
            content={<p style={{ fontSize: 32, color: "white" }}>18</p>}
            color={"red"}
          />
        </div>
      </div>
      <br />
    </div>
  );
}
