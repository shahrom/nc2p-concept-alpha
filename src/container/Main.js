/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Main.js
 * Created: Thursday, 1st April 2021 11:58:12 am
 * Modified: Thursday, 1st April 2021 12:01:18 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";

// utilities
import MessageDispatcher from "utilities/MessageDispatcher";
import ViewStateManager from "utilities/ViewStateManager";
import { GlobalConfig } from "utilities/GlobalConfig";

const styles = {
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.1)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0)",
      // outline: "1px solid slategrey",
    },
  },
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updateScreen: "false",
    };

    // Class implementation
    window.MessageDispatcher = new MessageDispatcher();
    window.ViewStateManager = new ViewStateManager();
  }

  // Refreshes the screen when the viewport changes
  componentDidMount() {
    // Refreshes all the components to that they will get rendered acoording to the
    // current viewport size
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));

    // Refreshes the screen when the viewport changes from Portrait to Landscape
    // The previous method was to refresh the screen but we no longer have to do that
    window.addEventListener("orientationchange", function () {
      var originalBodyStyle = getComputedStyle(document.body).getPropertyValue("display");
      document.body.style.display = "none";
      setTimeout(function () {
        document.body.style.display = originalBodyStyle;
      }, 10);
    });
  }

  updateWindowDimensions() {
    this.setState({
      updateScreen: true,
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <GlobalConfig.Provider value={this.app}>
            <Header />
            <Content />
            <Footer />
          </GlobalConfig.Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
