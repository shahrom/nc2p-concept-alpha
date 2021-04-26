/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Header.js
 * Created: Thursday, 1st April 2021 11:58:12 am
 * Modified: Thursday, 1st April 2021 12:34:18 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import Desktop from "utilities/Interface/Readiness/Desktop/Desktop";
import Mobile from "utilities/Interface/Readiness/Mobile/Mobile";

export default function Header() {
  const isMobile = useMediaQuery("(max-width:768px)");
  return <div>{isMobile ? <Mobile /> : <Desktop />}</div>;
}
