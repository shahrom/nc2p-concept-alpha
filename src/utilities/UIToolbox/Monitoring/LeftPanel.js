/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: LeftDrawer.js
 * Created: Wednesday, 4th November 2020 2:08:25 pm
 * Modified: Thursday, 5th November 2020 1:32:22 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSpring, animated } from "react-spring";
import GifPlayer from "react-gif-player";
import { Button } from "@material-ui/core";

// component
import { ChartPie1 } from "./components/ChartPie";
import { BarChart1 } from "./components/BarChart";
import { LineGauge } from "./components/LineGauge";
import { CircularGauge } from "./components/CircularGauge";
import { Sparkline } from "./components/Sparkline";

export default function LeftPanel() {
  const [open, setOpen] = React.useState(true);

  const MyListItem = (props) => (
    <div
      style={{
        padding: 10,
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor:
            props.title === true ? "rgba(40,133,222,0.8)" : "rgba(40,133,222,0.3)",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "white",
            padding: 5,
          }}
        >
          {props.label}
        </p>
      </div>
      <div>{props.content}</div>
    </div>
  );

  const ZoomtoMap = (val) => {
    var command;
    switch (val) {
      case 1:
        command = "ZOOM_TO_ROBBERY";
        break;
      case 2:
        command = "ZOOM_TO_FR";
        break;
      case 3:
        command = "ZOOM_TO_FIRE";
        break;
      case 4:
        command = "ZOOM_TO_COMMUNITY";
        break;
      case 5:
        command = "ZOOM_TO_PANICBUTTON";
        break;
      case 6:
        command = "ZOOM_TO_SENSORS";
        break;
    }
    var param = {
      Receiver: "MAPBOX",
      Command: command,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);

    // var param = {
    //   Receiver: "VIEW_STATE_MANAGER",
    //   Command: "DISPLAY_INFO_SLIDER",
    // };
    // window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const Content = () => (
    <div>
      <div style={{ backgroundColor: "rgba(255,165,0,0.5)" }}>
        <span
          style={{
            marginLeft: 10,
            fontFamily: "Barlow",
            color: "yellow",
            fontSize: 25,
            fontWeight: 500,
          }}
        >
          ALARMS
          <span
            style={{
              fontFamily: "Barlow",
              color: "white",
              fontSize: 24,
              fontWeight: 100,
            }}
          ></span>
        </span>
      </div>
      <List
        style={{
          maxHeight: window.innerHeight - 160,
          overflow: "auto",
        }}
      >
        <ListItem>
          <Button
            onClick={() => ZoomtoMap(1)}
            style={{
              width: "220px",
              outline: "none",
              color: "rgba(255,165,0,1)",
              borderColor: "rgba(255,165,0,0.5)",
              backgroundColor: "rgba(255,165,0,0.1)",
            }}
            variant="outlined"
          >
            ENFORCEMENT
          </Button>
        </ListItem>
        <ListItem>
          <Button
            onClick={() => ZoomtoMap(2)}
            style={{
              width: "220px",
              outline: "none",
              color: "rgba(255,165,0,1)",
              borderColor: "rgba(255,165,0,0.5)",
              backgroundColor: "rgba(255,165,0,0.1)",
            }}
            variant="outlined"
          >
            DETECTION
          </Button>
        </ListItem>
        <ListItem>
          <Button
            onClick={() => ZoomtoMap(3)}
            style={{
              width: "220px",
              outline: "none",
              color: "rgba(255,165,0,1)",
              borderColor: "rgba(255,165,0,0.5)",
              backgroundColor: "rgba(255,165,0,0.1)",
            }}
            variant="outlined"
          >
            FIRE
          </Button>
        </ListItem>
        <ListItem>
          <Button
            onClick={() => ZoomtoMap(4)}
            style={{
              width: "220px",
              outline: "none",
              color: "rgba(255,165,0,1)",
              borderColor: "rgba(255,165,0,0.5)",
              backgroundColor: "rgba(255,165,0,0.1)",
            }}
            variant="outlined"
          >
            COMMUNITY
          </Button>
        </ListItem>
        <ListItem>
          <Button
            onClick={() => ZoomtoMap(5)}
            style={{
              width: "220px",
              outline: "none",
              color: "rgba(255,165,0,1)",
              borderColor: "rgba(255,165,0,0.5)",
              backgroundColor: "rgba(255,165,0,0.1)",
            }}
            variant="outlined"
          >
            PANIC BUTTON
          </Button>
        </ListItem>
        <ListItem>
          <Button
            onClick={() => ZoomtoMap(6)}
            style={{
              width: "220px",
              outline: "none",
              color: "rgba(255,165,0,1)",
              borderColor: "rgba(255,165,0,0.5)",
              backgroundColor: "rgba(255,165,0,0.1)",
            }}
            variant="outlined"
          >
            SENSORS
          </Button>
        </ListItem>

        <MyListItem label={"COMPLAINTS"} content={<ChartPie1 />} />
        <MyListItem label={"REPORTS"} content={<BarChart1 />} />
        <MyListItem label={"TRAFFIC"} content={<LineGauge />} />
        <MyListItem label={"CRIME RATE"} content={<CircularGauge />} />
        <MyListItem label={"RIVER SENSORS"} content={<Sparkline />} />
        <MyListItem label={"DEVICES"} content={<BarChart1 />} />

        <ListItem>
          <div>
            <img
              src={"img/gif/chart1.gif"}
              width="450px"
              height="auto"
              object-fit="contain"
            />
          </div>
        </ListItem>

        <ListItem>
          <div>
            <img
              src={"img/gif/chart2.gif"}
              width="450px"
              height="auto"
              object-fit="contain"
            />
          </div>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div
    // style={{
    //   position: "absolute",
    //   height: window.innerHeight,
    //   marginLeft: 5,
    //   marginTop: -980,
    //   backdropFilter: "blur(5px)",
    //   backgroundColor: "rgba(0, 0, 0, 0.3)",
    // }}
    >
      <Content />
    </div>
  );
}
