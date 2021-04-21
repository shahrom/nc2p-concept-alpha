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

export default function Menu1(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(75,100,0,0.5)",
        padding: 20,
        height: 200,
      }}
    >
      <div
        onClick={() => {
          window.ViewStateManager.SetContent("ARMY");
          // window.document.getElementById("myBody").style.transition = "all 2s";
          // window.document.body.style.backgroundImage =
          //   "url('img/wallpaper/gray.jpg')";
        }}
        style={{ textAlign: "center" }}
      >
        <img
          src={"img/logo/td.png"}
          width={"100px"}
          height="auto"
          object-fit="contain"
        />
        <br />
        <span
          style={{
            fontFamily: "Barlow",
            color: "lime",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          ARMY
        </span>
      </div>
    </div>
  );
}
