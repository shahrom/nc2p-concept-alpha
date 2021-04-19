/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: TabContent.js
 * Created: Tuesday, 17th November 2020 10:40:11 am
 * Modified: Tuesday, 17th November 2020 1:36:07 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// components
import Content1 from "utilities/UIToolbox/CrimeDetail/Content1";
import Content2 from "utilities/UIToolbox/CrimeDetail/Content2";

export default function TabContent(props) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  React.useEffect(() => {
    setTabIndex(0);
  }, [props.callSign]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: 450,
          marginTop: 60,
        }}
      >
        <SwipeableViews
          index={tabIndex}
          style={{
            overflow: "hidden",
            height: window.innerHeight - 190,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: 5,
            margin: 5,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.4)",
            marginTop: 0,
          }}
        >
          <Content1 />
          <Content2 />
          <div />
        </SwipeableViews>
      </div>
      <div
        style={{
          marginLeft: 0,
          position: "absolute",
          width: 440,
          marginTop: 0,
        }}
      >
        <Tabs
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered
          value={tabIndex}
          style={{
            background:
              "linear-gradient(180deg, rgba(0,64,121,1) 2%, rgba(0,64,145,1) 100%)",
            borderRadius: 5,
            margin: 20,
            boxShadow: "0px 2px 5px rgba(0,0,0,0.4)",
          }}
        >
          <Tab
            style={{ minWidth: 100, outline: "none" }}
            label={<p style={{ marginTop: 15, color: "white" }}>LIST</p>}
          />
          <Tab
            style={{ minWidth: 100, outline: "none" }}
            label={<p style={{ marginTop: 15, color: "white" }}>REPORTS</p>}
          />
        </Tabs>
      </div>
    </div>
  );
}
