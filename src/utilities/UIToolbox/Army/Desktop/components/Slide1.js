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
import Readiness from "./Readiness";

export default function Slide1(props) {
  const handleUpdateData = () => {
    window.ViewStateManager.UpdateDisplayData();
  };
  return (
    <div
      onClick={() => handleUpdateData()}
      id="Army.Slider1"
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
          SUMMARY - 19 RAMD
        </p>
        <Readiness updateData={props.updateData} />
      </div>
    </div>
  );
}
