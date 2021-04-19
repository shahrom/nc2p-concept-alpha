/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: ZoneInfoView.js
 * Created: Thursday, 25th March 2021 10:21:32 pm
 * Modified: Friday, 26th March 2021 10:34:26 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import ViewState from "./ViewState";

// components
import TabContent from "./components/TabContent";
// icons
import CloseIcon from "@material-ui/icons/Close";

export default function ZoneInfoView() {
  // 1
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  // 2
  const viewState = new ViewState();
  viewState.bindSetOpen = setOpen;
  viewState.bindSetId = setId;
  viewState.bindOpen = open;

  const animLayout = useSpring({
    opacity: open ? 1 : 0,
    marginLeft: open ? window.innerWidth - 450 : window.innerWidth,
    marginTop: -740,
    config: {
      duration: 300,
    },
  });

  const handleClick = () => {
    setOpen(false);
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const MyTitle = () => (
    <div
      style={{
        padding: 10,
        height: 30,
        backgroundColor: "black",
        backdropFilter: "blur(2px)",
      }}
    >
      <div style={childrenSideBySideStyle}>
        <p style={{ color: "white", fontSize: 18, marginTop: 5 }}>{`ZONE ${id}`}</p>
        <CloseIcon
          onClick={() => handleClick()}
          style={{
            color: "white",
            marginLeft: 320,
            marginTop: 0,
          }}
        />
      </div>
    </div>
  );

  const divStyle = {
    background: "linear-gradient(148deg, rgba(0,0,0,0.2) 6%, rgba(0,0,0,0.2) 100%)",
    height: window.innerHeight,
    width: 450,
    boxShadow: "0px 2px 25px  rgba(0,0,0,0.5)",
    backdropFilter: "blur(2px)",
    position: "absolute",
  };

  return (
    <animated.div style={animLayout}>
      <div style={divStyle}>
        <MyTitle />
        <TabContent />
      </div>
    </animated.div>
  );
}
