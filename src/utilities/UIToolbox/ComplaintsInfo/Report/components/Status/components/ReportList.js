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
      countVerified: 62,
      countProcessed: 107,
      countReceived: 52,
      countCompleted: 18,

      VerifiedColor: "#0375ED",
      ProcessedColor: "#1A911A",
      CompletedColor: "#E88F06",
      conferenceColor: "#993299",
      ReceivedColor: "red",
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
            label={"RECEIVED"}
            counter={this.state.countReceived}
            color={this.state.ReceivedColor}
          />
          <MyLabelCounter
            label={"VERIFIED"}
            counter={this.state.countVerified}
            color={this.state.ProcessedColor}
          />
          <MyLabelCounter
            label={"PROCESSED"}
            counter={this.state.countProcessed}
            color={this.state.CompletedColor}
          />
          <MyLabelCounter
            label={"COMPLETED"}
            counter={this.state.countCompleted}
            color={this.state.VerifiedColor}
          />
        </List>
      </div>
    );
  }
}
