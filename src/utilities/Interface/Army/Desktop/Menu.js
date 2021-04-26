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

  const handleUpdateData = () => {
    window.ViewStateManager.UpdateDisplayData();
  };

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
            color: "lime",
            fontSize: 35,
            fontWeight: 500,
          }}
        >
          ARMY
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
            src={"img/logo/td.png"}
            width="100px"
            height="100px"
            object-fit="contain"
          />
        </div>

        <br />

        <div style={childrenSideBySideStyle}>
          <Button
            onClick={() => handleUpdateData()}
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
            19 RAMD
          </Button>
        </div>

        <br />

        <Button
          style={{ border: "none", outline: "none", color: "#0375ED" }}
          startIcon={<InfoIcon />}
          onClick={() => props.handleSlideIndex(1)}
        >
          Summary
        </Button>
        <br />
        <Button
          style={{ border: "none", outline: "none", color: "gray" }}
          startIcon={<InfoIcon />}
          // onClick={() => props.handleSlideIndex(2)}
        >
          Unit Readiness
        </Button>
        <br />
        <Button
          style={{ border: "none", outline: "none", color: "gray" }}
          startIcon={<InfoIcon />}
          // onClick={() => props.handleSlideIndex(3)}
        >
          SFS
        </Button>
        <br />
        <Button
          style={{ border: "none", outline: "none", color: "gray" }}
          startIcon={<InfoIcon />}
          // onClick={() => props.handleSlideIndex(4)}
        >
          Reports
        </Button>
      </div>
    </animated.div>
  );
}
