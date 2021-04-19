/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DailyStatus.js
 * Created: Thursday, 25th March 2021 10:21:32 pm
 * Modified: Tuesday, 30th March 2021 2:59:19 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import IconButton from "@material-ui/core/IconButton";

// components
import Report from "./Report/Report";

// icons
import HomeIcon from "@material-ui/icons/Home";

export default function Menu(props) {
  // 1
  const [open, setOpen] = React.useState(true);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        overflow: "auto",
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
    >
      <Report />
    </div>
  );
}
