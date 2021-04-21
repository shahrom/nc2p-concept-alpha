/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Tangkapan.js
 * Created: Thursday, 25th March 2021 12:44:07 pm
 * Modified: Thursday, 25th March 2021 1:22:06 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";

export default function Menu3(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 181, 204, 0.5)",
        padding: 20,
        height: 200,
      }}
    >
      <div
        onClick={() => {
          window.ViewStateManager.SetContent("COMPLAINTS");
        }}
        style={{ textAlign: "center" }}
      >
        <br />
        <img src={"img/logo/tu.png"} width={"158px"} height="auto" object-fit="contain" />
        <br />
        <span
          style={{
            fontFamily: "Barlow",
            color: "cyan",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          AIRFORCE
        </span>
      </div>
    </div>
  );
}
