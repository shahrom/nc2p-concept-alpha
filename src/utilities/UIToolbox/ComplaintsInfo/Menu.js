/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Menu.js
 * Created: Wednesday, 7th April 2021 12:33:44 pm
 * Modified: Wednesday, 7th April 2021 4:41:14 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { useSpring, animated } from "react-spring";
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

  const animLayout = useSpring({
    opacity: open ? 1 : 0,
    config: {
      duration: 500,
    },
  });

  return (
    <animated.div style={animLayout}>
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
              backgroundColor: "#0f1215",
            }}
          >
            <span style={{ color: "gray", fontSize: 28 }}>
              <IconButton
                style={{ outline: "none" }}
                onClick={() => window.ViewStateManager.SetContent("COMPLAINTS")}
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
              backgroundColor: "#272E38",
              background: "linear-gradient(90deg, #0f1215 10%, #272E38 100%)",
            }}
          >
            <p
              style={{
                color: "gray",
                fontSize: 24,
                marginTop: 10,
                marginLeft: 0,
              }}
            >
              COMPLAINTS MANAGEMENT
            </p>
          </div>
        </div>

        <Report />
      </div>
    </animated.div>
  );
}
