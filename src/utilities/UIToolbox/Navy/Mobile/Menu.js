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
import SearchIcon from "@material-ui/icons/Search";
import InfoIcon from "@material-ui/icons/Info";

export default function Menu(props) {
  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      <br />
      <div style={childrenSideBySideStyle}>
        <img
          src={"img/logo/tl.png"}
          width={"30px"}
          height="auto"
          object-fit="contain"
        />
        <div style={{ width: 10 }} />
        <span
          style={{
            fontFamily: "Barlow",
            color: "blue",
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          NAVY
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
          MAWILLA 1
        </Button>
      </div>
    </div>
  );
}
