/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Slide1.js
 * Created: Wednesday, 21st April 2021 12:18:42 pm
 * Modified: Wednesday, 21st April 2021 2:35:19 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Summary from "./Summary";

export default function Slide1(props) {
  return (
    <div
      id="Army.Slider1"
      style={{
        backgroundColor: "rgba(17,21,30,0.5)",
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
          SUMMARY
        </p>
        <Summary />
      </div>
    </div>
  );
}
