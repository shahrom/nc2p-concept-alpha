/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: ReportList copy.js
 * Created: Wednesday, 18th November 2020 2:57:01 pm
 * Modified: Wednesday, 18th November 2020 2:57:01 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

export default class ReportList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countStopNTalk: 4,
      countMeetNGreet: 3,
      countRespond: 2,
      countInspection: 2,
      countConferencePoint: 1,

      stopntalkColor: "#0375ED",
      meetngreetColor: "#1A911A",
      inspectionColor: "#E88F06",
      conferenceColor: "#993299",
      respondColor: "red",
    };
  }

  render() {
    const MyLabelCounter = (props) => (
      <ListItem>
        <ListItemText
          primary={
            <span style={{ fontSize: 16, color: "white" }}>{props.label}</span>
          }
        />
        <Avatar style={{ backgroundColor: props.color, height: 30, width: 30 }}>
          <span style={{ fontSize: 16 }}>{props.counter}</span>
        </Avatar>
      </ListItem>
    );

    return (
      <div>
        <List style={{ padding: "10px" }}>
          <MyLabelCounter
            label={"STOP & TALK"}
            counter={this.state.countStopNTalk}
            color={this.state.stopntalkColor}
          />
          <MyLabelCounter
            label={"MEET & GREET"}
            counter={this.state.countMeetNGreet}
            color={this.state.meetngreetColor}
          />
          <MyLabelCounter
            label={"INSPECTION"}
            counter={this.state.countInspection}
            color={this.state.inspectionColor}
          />
          <MyLabelCounter
            label={"CONFERENCE POINT"}
            counter={this.state.countConferencePoint}
            color={this.state.conferenceColor}
          />
          <MyLabelCounter
            label={"RESPOND"}
            counter={this.state.countRespond}
            color={this.state.respondColor}
          />
        </List>
      </div>
    );
  }
}