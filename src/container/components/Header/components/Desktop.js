/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Header.js
 * Created: Thursday, 1st April 2021 11:58:12 am
 * Modified: Thursday, 1st April 2021 12:34:18 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { useSpring, animated } from "react-spring";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useMediaQuery } from "react-responsive";

// state
import ViewState from "../ViewState";

// icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import ViewListIcon from "@material-ui/icons/ViewList";

export default function Desktop() {
  // 1
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("DASHBOARD");
  // 2
  const viewState = new ViewState();
  viewState.bindSetOpen = setOpen;
  viewState.bindSetValue = setValue;
  // 3
  const animLayout = useSpring({
    opacity: open ? 1 : 0,
    from: { transform: "translateY(-100px)" },
    to: { transform: "translateY(0px)" },
    config: {
      duration: 500,
    },
  });

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const handleChange = (event, type) => {
    setValue(type);
    window.ViewStateManager.SetContent(type);
  };

  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 991, maxWidth: 1824 });
  const isTablet = useMediaQuery({ minWidth: 767, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  return (
    <animated.div style={animLayout}>
      <div>
        <span
          style={{
            fontFamily: "Michroma",
            color: "gray",
            fontSize: 35,
            fontWeight: 400,
          }}
        >
          <span style={{ display: isDesktopOrLaptop ? "block" : "none" }}>
            <span style={{ color: "white" }}>NC2+</span> MOBILE
          </span>
          <span style={{ display: isBigScreen ? "block" : "none" }}>
            <span style={{ color: "white" }}>NC2+</span> MOBILE
          </span>
          <span style={{ display: isTablet ? "block" : "none" }}>
            <span style={{ color: "white" }}>NC2+</span> MOBILE
          </span>
          <span style={{ display: isMobile ? "block" : "none" }}>
            <span style={{ color: "white" }}>NC2+</span> MOBILE
          </span>
        </span>

        <div style={{ float: "right", marginTop: -50 }}>
          <div style={childrenSideBySideStyle}>
            <AccountCircleIcon
              style={{
                color: "white",
                marginTop: 10,
                fontSize: 40,
                marginRight: 10,
              }}
            />
            <SearchIcon
              style={{
                color: "white",
                marginTop: 10,
                fontSize: 40,
                marginRight: 10,
              }}
            />
            <ViewListIcon
              style={{
                color: "white",
                marginTop: 10,
                fontSize: 40,
                marginRight: 10,
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          height: 50,
          position: "relative",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div style={childrenSideBySideStyle}>
          <Tabs
            value={value}
            onChange={handleChange}
            style={{
              marginLeft: 0,
              height: 50,
              outline: "none",
            }}
            TabIndicatorProps={{
              style: {
                background: "rgba(255,255,255,0.2)",
                borderRadius: 5,
                height: 2,
                top: 38,
              },
            }}
          >
            <Tab
              style={{ minWidth: 150, outline: "none" }}
              label={
                <p style={{ marginTop: 5, fontSize: 16, color: "cyan" }}>READINESS</p>
              }
              value={"STATUS"}
            />
            <Tab
              style={{ minWidth: 150, outline: "none" }}
              label={
                <p style={{ marginTop: 5, fontSize: 16, color: "orange" }}>
                  INTELLIGENCE
                </p>
              }
              value={"STATUS"}
            />
            <Tab
              style={{ minWidth: 150, outline: "none" }}
              label={
                <p style={{ marginTop: 5, fontSize: 16, color: "lime" }}>PLANNING</p>
              }
              value={"STATUS"}
            />
            <Tab
              style={{ minWidth: 150, outline: "none" }}
              label={
                <p style={{ marginTop: 5, fontSize: 16, color: "yellow" }}>COMMAND</p>
              }
              value={"MONITORING"}
            />
          </Tabs>
        </div>
      </div>
    </animated.div>
  );
}
