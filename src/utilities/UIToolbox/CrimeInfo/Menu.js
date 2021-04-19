/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DailyStatus.js
 * Created: Thursday, 25th March 2021 10:21:32 pm
 * Modified: Tuesday, 30th March 2021 2:59:19 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import IconButton from "@material-ui/core/IconButton";

// components
import Report from "./Report/Report";

// icons
import HomeIcon from "@material-ui/icons/Home";

export default function Menu(props) {
  // 1
  const [open, setOpen] = React.useState(true);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        overflow: "auto",
        height: window.innerHeight - 80,
        backgroundColor: "rgba(0,0,0,0.2)",
        margin: 5,
      }}
    >
      <div style={childrenSideBySideStyle}>
        <div
          style={{
            width: 50,
            height: 50,
            textAlign: "center",
            backgroundColor: "rgba(0,64,122,0.6)",
          }}
        >
          <span style={{ color: "gray", fontSize: 28 }}>
            <IconButton
              style={{ outline: "none" }}
              onClick={() => window.ViewStateManager.SetContent("CRIME")}
            >
              <HomeIcon style={{ fontSize: 28, color: "gray" }} />
            </IconButton>
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            width: 400,
            height: 50,
            textAlign: "center",
            backgroundColor: "rgba(33,147,211,0.3)",
          }}
        >
          <p
            style={{
              color: "gray",
              fontSize: 24,
              marginTop: 10,
              marginLeft: -20,
            }}
          >
            CRIME PREVENTION
          </p>
        </div>
      </div>

      <Report />
    </div>
  );
}
