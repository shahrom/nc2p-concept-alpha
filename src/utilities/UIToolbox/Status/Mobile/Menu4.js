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

export default function Menu4(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(77, 19, 209, 0.5)",
        padding: 20,
        height: 200,
      }}
    >
      <div
        onClick={() => {
          window.ViewStateManager.SetContent("ATB");
        }}
        style={{ textAlign: "center" }}
      >
        <img
          src={"img/logo/atb.png"}
          width={"238px"}
          height="auto"
          object-fit="contain"
          style={{ marginTop: 20 }}
        />
        <span
          style={{
            fontFamily: "Barlow",
            color: "white",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          JOINTFORCE
        </span>
      </div>
    </div>
  );
}
