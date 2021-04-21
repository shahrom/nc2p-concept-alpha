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
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AppsIcon from "@material-ui/icons/Apps";

export default function Menu1(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(75,100,0,0.5)",
        padding: 20,
        height: 500,
      }}
    >
      <div>
        <p style={{ color: "gray", fontSize: 14 }}>
          <span style={{ color: "gray", fontSize: 24 }}></span>TENTERA DARAT DIRAJA
          MALAYSIA
        </p>

        <span
          style={{
            fontFamily: "Barlow",
            color: "lime",
            fontSize: 25,
            fontWeight: 500,
          }}
        >
          ARMY
          <span
            style={{
              fontFamily: "Barlow",
              color: "white",
              fontSize: 24,
              fontWeight: 100,
            }}
          ></span>
        </span>

        <br />
        <hr style={{ borderColor: "gray" }} />
        <br />
      </div>

      <div style={{ textAlign: "center" }}>
        <img src={"img/logo/td.png"} width={"150px"} height="auto" object-fit="contain" />
        <br />
        <br />
        <br />
        <Button
          onClick={() => {
            window.ViewStateManager.SetContent("ARMY");
          }}
          style={{
            outline: "none",
            color: "orange",
            borderColor: "gray",
          }}
          variant="outlined"
          startIcon={<EqualizerIcon />}
        >
          MORE INFO
        </Button>
      </div>
    </div>
  );
}
