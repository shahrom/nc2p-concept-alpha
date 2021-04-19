/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: UnitList.js
 * Created: Thursday, 25th February 2021 9:46:22 am
 * Modified: Thursday, 25th February 2021 12:06:03 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

export default class UnitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      listOfReports: [],
      tilesData: [],
      reportData: [],
      progressStatus: "hide",
      displayAudio: "none",
      displayVideo: "none",
      displayImage: "none",
      title: "",
      currentImageURL: "",
      open: false,
    };
  }

  componentDidMount() {
    var self = this;
    fetch("data/District/Patrol/PatrolList.json")
      .then((result) => result.json())
      .then((data) => {
        this.populateData(data);
        this.plotOnMap(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  plotOnMap(data) {
    var param = {
      Receiver: "MAP_PLOT",
      Command: "PLOT_TASKING_SYMBOLS",
      Data: data,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  }

  populateData(data) {
    var sortedList = [];

    // DataAdater ===================================
    for (var i = 0; i < data.length; i++) {
      sortedList.push(data[i]);
    }
    // =============================================

    this.setState({ listOfReports: sortedList });
  }

  handleTouchTap = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleImageLoaded() {
    this.setState({ progressStatus: "hide" });
    this.setState({ imageMarginTop: "-50px" });
  }

  handleImageErrored() {
    this.setState({ progressStatus: "failed to load" });
  }

  handleRefreshList = () => {
    var self = this;
    self.loadMedia();
  };

  loadMedia() {
    this.dataService.GetMediaList(this.props.eventId, function (data) {
      this.populateData(data);
    });
  }

  render() {
    const childrenSideBySideStyle = {
      display: "flex",
      flexDirection: "row",
    };

    return (
      <div style={{ backgroundColor: "", height: window.innerHeight - 200 }}>
        <List>
          {this.state.listOfReports.map((row, index) => (
            <div>
              <ListItem>
                {/* // Left Icon */}
                <ListItemIcon>
                  <div style={childrenSideBySideStyle}>
                    <img
                      style={{ width: 80, height: 80, opacity: 0.7 }}
                      src={"img/icons/" + row.PatrolIcon}
                    />
                  </div>
                  <div style={{ width: 30 }} />
                </ListItemIcon>

                {/* // Title */}
                <ListItemText
                  primary={
                    <span style={{ color: "white", fontSize: "24px" }}>
                      {row.CallSign.toUpperCase()}
                    </span>
                  }
                  secondary={
                    <span
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "13px",
                      }}
                    >
                      <span style={{ fontSize: 14, color: "#00A2E8" }}>
                        {row.ZoneCodeName.toUpperCase()}
                      </span>{" "}
                      -- {row.Location}
                    </span>
                  }
                  style={{ color: "gray", fontSize: "16px", opacity: 0.8 }}
                />
              </ListItem>

              <Divider
                style={{
                  margin: "0px 20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              />
            </div>
          ))}
        </List>
      </div>
    );
  }
}
