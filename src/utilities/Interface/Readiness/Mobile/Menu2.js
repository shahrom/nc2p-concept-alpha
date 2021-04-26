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
import Button from "@material-ui/core/Button";

// icons
import InfoIcon from "@material-ui/icons/Info";

export default function Menu2(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(44, 130, 201, 0.5)",
        padding: 20,
        height: 200,
      }}
    >
      <div
        onClick={() => {
          window.ViewStateManager.SetContent("NAVY");
        }}
        style={{ textAlign: "center" }}
      >
        <img
          src={"img/logo/tl.png"}
          width={"118px"}
          height="auto"
          object-fit="contain"
        />
        <br />
        <span
          style={{
            fontFamily: "Barlow",
            color: "blue",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          NAVY
        </span>
      </div>
    </div>
  );
}
