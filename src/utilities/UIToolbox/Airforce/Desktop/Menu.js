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
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
        <br />
        <Button
          onClick={() => window.ViewStateManager.SetContent("READINESS")}
          style={{
            outline: "none",
            color: "gray",
            borderColor: "",
          }}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          BACK
        </Button>
        <hr style={{ borderColor: "gray" }} />
        <br />

        <span
          style={{
            fontFamily: "Barlow",
            color: "#42A9AD",
            fontSize: 35,
            fontWeight: 500,
          }}
        >
          AIRFORCE
          <span
            style={{
              fontFamily: "Barlow",
              color: "white",
              fontSize: 34,
              fontWeight: 100,
            }}
          >
            READINESS
          </span>
        </span>

        <br />

        <div style={{ marginLeft: 60, padding: 20 }}>
          <img
            src={"img/logo/tu.png"}
            width="150px"
            height="150px"
            object-fit="contain"
          />
        </div>

        <br />

        <div style={childrenSideBySideStyle}>
          <Button
            style={{
              outline: "none",
              color: "cyan",
              borderColor: "gray",
            }}
            variant="outlined"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
          <div style={{ width: 5 }} />
          <Button
            style={{
              outline: "none",
              color: "cyan",
              borderColor: "gray",
              backgroundColor: "rgba(255,255,255,0.2)",
              width: 150,
            }}
            variant="outlined"
          >
            MTU
          </Button>
        </div>

        <br />

        <Button
          style={{ border: "none", outline: "none", color: "#0375ED" }}
          startIcon={<InfoIcon />}
          onClick={() => props.handleSlideIndex(1)}
        >
          Aircraft Readiness
        </Button>
        <br />
        <Button
          style={{ border: "none", outline: "none", color: "#0375ED" }}
          startIcon={<InfoIcon />}
          onClick={() => props.handleSlideIndex(2)}
        >
          Radar Readiness
        </Button>
        <br />
        <Button
          style={{ border: "none", outline: "none", color: "gray" }}
          startIcon={<InfoIcon />}
          // onClick={() => props.handleSlideIndex(3)}
        >
          Aircraft Type Status Summary
        </Button>
        <br />
        <Button
          style={{ border: "none", outline: "none", color: "gray" }}
          startIcon={<InfoIcon />}
          // onClick={() => props.handleSlideIndex(3)}
        >
          Radar Status Summary
        </Button>
        <br />
      </div>
    </animated.div>
  );
}
