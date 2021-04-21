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
import Button from "@material-ui/core/Button";

// icons
import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@material-ui/icons/Search";

export default function CrisisManagement(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <br />
      <div style={childrenSideBySideStyle}>
        <img src={"img/logo/td.png"} width={"30px"} height="auto" object-fit="contain" />
        <div style={{ width: 10 }} />
        <span
          style={{
            fontFamily: "Barlow",
            color: "lime",
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          ARMY
          <span
            style={{
              fontFamily: "Barlow",
              color: "white",
              fontSize: 24,
              fontWeight: 100,
            }}
          >
            READINESS
          </span>
        </span>
      </div>

      <br />
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
        ></Button>
        <div style={{ width: 5 }} />
        <Button
          style={{
            outline: "none",
            color: "cyan",
            borderColor: "gray",
            backgroundColor: "rgba(255,255,255,0.2)",
            width: "100%",
          }}
          variant="outlined"
        >
          19 RAMD
        </Button>
      </div>

      {/* <Button
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
      </Button> */}
    </div>
  );
}
