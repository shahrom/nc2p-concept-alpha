/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: GlobalConfig.js
 * Created: Thursday, 1st April 2021 12:21:36 pm
 * Modified: Thursday, 1st April 2021 12:21:37 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { createContext } from "react";

export const GlobalConfig = createContext(null);

// Note: This has to be in a separate file because any components will import this file as an
// input to React.useContext(GlobalConfig);
