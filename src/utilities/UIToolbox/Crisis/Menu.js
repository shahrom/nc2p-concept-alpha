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
    <animated.div style={animLayout}>
      <div>
        <p style={{ color: "white", fontSize: 14 }}>
          <span style={{ color: "white", fontSize: 24 }}>02</span>/CRISIS
          MANAGEMENT
        </p>

        <div style={childrenSideBySideStyle}>
          <Chip
            style={{ color: "gray", borderColor: "gray" }}
            label="FLOOD"
            variant="outlined"
            size="small"
          />
          <div style={{ width: 10 }} />
          <Chip
            style={{ color: "gray", borderColor: "gray" }}
            label="FIRE"
            variant="outlined"
            size="small"
          />
          <div style={{ width: 10 }} />
          <Chip
            style={{ color: "gray", borderColor: "gray" }}
            label="FALLING TREE"
            variant="outlined"
            size="small"
          />
        </div>
        <br />
        <br />

        {/* // Title */}
        <span
          style={{
            fontFamily: "Barlow",
            color: "orange",
            fontSize: 35,
            fontWeight: 500,
          }}
        >
          CRISIS
          <span
            style={{
              fontFamily: "Barlow",
              color: "white",
              fontSize: 34,
              fontWeight: 100,
            }}
          >
            MANAGEMENT
          </span>
        </span>

        <br />

        <div>
          <img
            src={"img/content/crisis/main.jpg"}
            width="100%"
            height="auto"
            object-fit="contain"
          />
        </div>

        <br />

        <div style={childrenSideBySideStyle}>
          <Button
            onClick={() => props.handleSlideIndex(1)}
            style={{
              outline: "none",
              color: "cyan",
              borderColor: "gray",
            }}
            variant="outlined"
            startIcon={<AppsIcon />}
          >
            Slide 1
          </Button>
          <div style={{ width: 10 }} />
          <Button
            onClick={() => props.handleSlideIndex(2)}
            style={{
              outline: "none",
              color: "cyan",
              borderColor: "gray",
            }}
            variant="outlined"
            startIcon={<EqualizerIcon />}
          >
            Slide 2
          </Button>
        </div>

        <br />

        <Button
          style={{ border: "none", outline: "none", color: "#0375ED" }}
          startIcon={<InfoIcon />}
          onClick={() => {
            window.ViewStateManager.SetContent("CRISIS-INFO");
          }}
        >
          Detail Info
        </Button>
      </div>
    </animated.div>
  );
}
