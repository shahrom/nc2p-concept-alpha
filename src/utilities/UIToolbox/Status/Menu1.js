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
import { useSpring, animated } from "react-spring";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import ScrollText from "react-scroll-text";

// icons
import InfoIcon from "@material-ui/icons/Info";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AppsIcon from "@material-ui/icons/Apps";

export default function CrisisManagement(props) {
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
    // <animated.div style={animLayout}>
    <div>
      <p style={{ color: "gray", fontSize: 14 }}>
        <span style={{ color: "gray", fontSize: 24 }}></span>Last Updated (2 hrs ago)
      </p>

      {/* <div style={childrenSideBySideStyle}>
        <div style={{ width: 10 }} />
        <Chip
          style={{ color: "gray", borderColor: "gray" }}
          label="MAP"
          variant="outlined"
          size="small"
        />
        <div style={{ width: 10 }} />
        <Chip
          style={{ color: "gray", borderColor: "gray" }}
          label="CHAT"
          variant="outlined"
          size="small"
        />
        <div style={{ width: 10 }} />
        <Chip
          style={{ color: "gray", borderColor: "gray" }}
          label="REPORTS"
          variant="outlined"
          size="small"
        />
      </div>
      <br />
      <br /> */}

      {/* // Title */}
      <span
        style={{
          fontFamily: "Barlow",
          color: "orange",
          fontSize: 25,
          fontWeight: 500,
        }}
      >
        ATM
        <span
          style={{
            fontFamily: "Barlow",
            color: "white",
            fontSize: 24,
            fontWeight: 100,
          }}
        ></span>
      </span>

      <br />

      <div>
        <img
          src={"img/content/crisis/content.gif"}
          width="100%"
          height="auto"
          object-fit="contain"
        />
      </div>

      <br />

      <Button
        style={{ border: "none", outline: "none", color: "#0375ED" }}
        startIcon={<InfoIcon />}
        onClick={() => {
          window.ViewStateManager.SetContent("MONITORING");
        }}
      >
        More Info
      </Button>
      <br />
      <Button
        style={{ border: "none", outline: "none", color: "#0375ED" }}
        startIcon={<InfoIcon />}
        onClick={() => {
          window.ViewStateManager.SetContent("MONITORING");
        }}
      >
        Alerts & Notifications
      </Button>

      <div style={{ width: "100%" }}>
        <ScrollText>
          <p style={{ color: "white" }}>
            Notification of the day - ini terdapat 158 kes baharu yang telah pulih dan
            dibenarkan discaj iaitu dari Hospital Miri (35), Hospital Umum Sarawak (34),
            Hospital Sibu (19), Hospital Sarikei (17), PKRC di bawah Hospital Kapit (17),
            Hospital Bintulu (12), PKRC Serian (6), PKRC di bawah Hospital Sri Aman (6),
            PKRC di bawah Hospital Mukah (5), Hospital Limbang (4) dan PKRC Betong (3).
            Ini menjadikan jumlah keseluruhan kes positif COVID-19 yang telah pulih atau
            dibenarkan discaj setakat hari ini adalah seramai 15,087 orang atau 81.57%
            dari jumlah keseluruhan kes COVID-19 di Sarawak.
          </p>
        </ScrollText>
      </div>
    </div>
    // </animated.div>
  );
}
