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
import ScrollMenu from "react-horizontal-scrolling-menu";

// state
import ViewState from "../ViewState";

// icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import ViewListIcon from "@material-ui/icons/ViewList";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function Potrait() {
  // 1
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("DASHBOARD");
  const [selected, setSelected] = React.useState(null);
  const [items, setItems] = React.useState([]);
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

  React.useEffect(() => {
    setItems(Menu(list, "item1"));
  }, []);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 991, maxWidth: 1824 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  const list = [
    { name: "STATUS" },
    { name: "CRISIS" },
    { name: "CRIME" },
    { name: "COMPLAINTS" },
    { name: "MAP" },
    { name: "STATISTICS" },
    { name: "WEATHER" },
    { name: "SURVEILLANCE" },
    { name: "CCTV" },
  ];

  const handleSelect = (key) => {
    setSelected(key);
    window.ViewStateManager.SetContent(key);
  };

  const handleFullScreen = () => {
    try {
      var goFS = document.getElementById("goFS");
      goFS.addEventListener(
        "click",
        function () {
          document.body.requestFullscreen();
        },
        false
      );
    } catch (error) {
      console.log(error);
    }
  };

  const MenuItem = ({ text, selected }) => {
    return (
      <Tab
        style={{ outline: "none", marginTop: -15 }}
        label={
          <p style={{ marginTop: 5, fontSize: 16, color: selected ? "cyan" : "#008b8b" }}>
            {text}
          </p>
        }
        value={text}
      />
    );
  };

  const Menu = (list, selected) =>
    list.map((el) => {
      const { name } = el;
      return <MenuItem text={name} key={name} selected={selected} />;
    });

  const Arrow = ({ text }) => {
    return <div style={{ color: "orange" }}>{text}</div>;
  };
  const ArrowLeft = Arrow({ text: "<" });
  const ArrowRight = Arrow({ text: ">" });

  return (
    <animated.div style={animLayout}>
      <div>
        <span
          style={{
            fontFamily: "Michroma",
            color: "gray",
            fontSize: 20,
            fontWeight: 400,
          }}
        >
          <span
            id="goFS"
            onClick={handleFullScreen()}
            style={{ display: isMobile ? "block" : "none" }}
          >
            <span style={{ color: "white" }}>NC2+</span> MOBILE
          </span>
        </span>

        <div style={{ float: "right", marginTop: -38 }}>
          <div style={childrenSideBySideStyle}>
            <AccountCircleIcon
              style={{
                color: "white",
                marginTop: 15,
                fontSize: 25,
                marginRight: 10,
              }}
            />
            <SearchIcon
              style={{
                color: "white",
                marginTop: 15,
                fontSize: 25,
                marginRight: 10,
              }}
            />
            <ViewListIcon
              style={{
                color: "white",
                marginTop: 15,
                fontSize: 25,
                marginRight: 10,
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 5,
          marginTop: 10,
          height: 20,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "block",
        }}
      >
        <ScrollMenu
          data={items}
          // arrowLeft={ArrowLeft}
          // arrowRight={ArrowRight}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>
    </animated.div>
  );
}