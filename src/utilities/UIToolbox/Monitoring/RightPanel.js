/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Dashboard.js
 * Created: Saturday, 3rd October 2020 7:50:47 am
 * Modified: Sunday, 4th October 2020 2:33:35 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import List from "@material-ui/core/List";
import ReactPlayer from "react-player";

export default function RightPanel() {
  const [open, setOpen] = React.useState(true);

  const handleOpenDetail = (id) => {
    if (id === "IERS") window.ViewStateManager.DisplayIERSDetail();
    if (id === "IVSS") window.ViewStateManager.DisplayIVSSDetail();
    if (id === "ITMS") window.ViewStateManager.DisplayITMSDetail();
    if (id === "IPDRS") window.ViewStateManager.DisplayIPDRSDetail();
    if (id === "ICMS") window.ViewStateManager.DisplayICMSDetail();
  };

  const MyListItem = (props) => (
    <div
      style={{
        paddingLeft: 5,
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor:
            props.title === true
              ? "rgba(40,133,222,0.8)"
              : "rgba(40,133,222,0.3)",
        }}
      >
        <p
          onClick={() => handleOpenDetail(props.id)}
          style={{
            fontSize: "14px",
            color: "white",
            padding: 10,
          }}
        >
          {props.label}
        </p>
      </div>
      <div>{props.content}</div>
    </div>
  );

  const Content = () => (
    <div>
      <div style={{ backgroundColor: "rgba(44,119,224,0.8)" }}>
        <span
          style={{
            marginLeft: 10,
            fontFamily: "Barlow",
            color: "cyan",
            fontSize: 25,
            fontWeight: 500,
          }}
        >
          SUB
          <span
            style={{
              fontFamily: "Barlow",
              color: "white",
              fontSize: 24,
              fontWeight: 100,
            }}
          >
            SYSTEMS
          </span>
        </span>
      </div>

      <List
        style={{
          height: window.innerHeight - 90,
          overflow: "auto",
        }}
      >
        <MyListItem
          id={"IERS"}
          label={"IERS - FLOOD"}
          content={
            <img
              src={"img/content/crisis/content.gif"}
              width="450px"
              height="auto"
              object-fit="contain"
            />
          }
        />
        <MyListItem
          id={"IVSS"}
          label={"IVSS - SURVEILLANCE"}
          content={
            <div>
              <ReactPlayer
                style={{ padding: 0 }}
                width={372}
                height={"auto"}
                url={"http://115.133.238.21:98/uploaded/video/Kuching/K2.mp4"}
                playing={true}
                loop={true}
                muted={true}
                autoPlay={true}
                controls={false}
              />
            </div>
          }
        />
        <MyListItem
          id={"ITMS"}
          label={"ITMS - TRAFFIC"}
          content={
            <div>
              <ReactPlayer
                style={{ padding: 0 }}
                width={372}
                height={"auto"}
                url={
                  "http://115.133.238.21:98/uploaded/video/KualaLumpur/cctv2.mp4"
                }
                playing={true}
                loop={true}
                muted={true}
                autoPlay={true}
                controls={false}
              />
            </div>
          }
        />

        <MyListItem
          id={"IPDRS"}
          label={"IPDRS - ENFORCEMENTS"}
          content={
            <img
              src={"img/content/crime/monitoring.gif"}
              width="450px"
              height="auto"
              object-fit="contain"
            />
          }
        />
        <MyListItem
          id={"ICMS"}
          label={"ICMS - COMPLAINTS"}
          content={
            <img
              src={"img/content/complaints/monitoring.gif"}
              width="450px"
              height="auto"
              object-fit="contain"
            />
          }
        />
        {/* <MyListItem
          label={"WEATHER"}
          content={
            <img
              src={"img/content/chart13.png"}
              width="450px"
              height="auto"
              object-fit="contain"
            />
          }
        /> */}
      </List>
    </div>
  );

  return (
    // <animated.div style={animLayout}>
    <div
    // style={{
    //   position: "absolute",
    //   width: 400,
    //   height: window.innerHeight,
    //   backgroundColor: "rgba(0,0,0,0)",
    //   marginLeft: window.innerWidth - 410,
    //   marginTop: -50 - window.innerHeight,
    //   backdropFilter: "blur(5px)",
    //   backgroundColor: "rgba(0, 0, 0, 0.6)",
    // }}
    >
      <Content />
    </div>
    // </animated.div>
  );
}
