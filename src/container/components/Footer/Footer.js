/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Footer.js
 * Created: Thursday, 1st April 2021 11:58:12 am
 * Modified: Thursday, 1st April 2021 12:34:20 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { useSpring, animated } from "react-spring";
import { useMediaQuery } from "react-responsive";

// state
import ViewState from "./ViewState";

export default function FooterView() {
  // 1
  const [open, setOpen] = React.useState(false);
  // 2
  const viewState = new ViewState();
  viewState.bindSetOpen = setOpen;
  // 3
  const animLayout = useSpring({
    // transform: open ? "translateY(0px)" : "translateY(-200px)",
    display: open ? "block" : "none",
    config: {
      duration: 500,
    },
  });

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <animated.div style={animLayout}>
      <div
        style={{
          display: isMobile ? "none" : "block",
          bottom: 100,
          height: 0,
          position: "absolute",
          marginTop: window.innerHeight,
          width: window.innerWidth,
        }}
      >
        <div style={childrenSideBySideStyle}>
          <div style={{ width: 20 }} />
          <img
            src={"img/logo/scs-logo.png"}
            width="70px"
            height="50px"
            object-fit="contain"
          />

          <div style={{ width: 350 }}>
            <p style={{ color: "green", fontSize: 16, marginTop: 10 }}>
              System Consultancy Services
            </p>
            <p style={{ color: "gray", fontSize: 12, marginTop: -15 }}>
              Your Thinking Company
            </p>
          </div>
          <div style={{ width: 120 }} />
        </div>
      </div>
    </animated.div>
  );
}
