/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Chart.js
 * Created: Tuesday, 9th February 2021 11:34:26 pm
 * Modified: Wednesday, 10th February 2021 2:50:44 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ListItemText from "@material-ui/core/ListItemText";

let stopNtalk = 0;
const COLORS = [
  "#0088FE",
  "#1ba716",
  "#ffa500",
  "#ff0000",
  "#7c26cb",
  "gray",
  "brown",
  "olive",
];

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      countStopNTalk: 0,
      countMeetNGreet: 0,
      countRespond: 0,
      countInspection: 0,
      countConferencePoint: 0,
      totalReports: 0,
    };
  }

  componentDidMount() {
    this.setState({
      countStopNTalk: 4,
      countMeetNGreet: 3,
      countRespond: 2,
      countInspection: 2,
      countConferencePoint: 1,
      totalReports: 12,
    });
  }

  render() {
    const data = [
      {
        name: "",
        STOPNTALK: this.state.countStopNTalk,
        MEETNGREET: this.state.countMeetNGreet,
        INSPECTION: this.state.countInspection,
        CONFERENCEPOINT: this.state.countConferencePoint,
        RESPOND: this.state.countRespond,
      },
    ];

    return (
      <div>
        <br />
        <br />
        <BarChart
          width={400}
          height={200}
          data={data}
          margin={{ top: 15, right: 30, left: 20, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <Tooltip /> */}
          <Bar dataKey="STOPNTALK" fill={COLORS[0]} />
          <Bar dataKey="MEETNGREET" fill={COLORS[1]} />
          <Bar dataKey="INSPECTION" fill={COLORS[2]} />
          <Bar dataKey="CONFERENCEPOINT" fill={COLORS[4]} />
          <Bar dataKey="RESPOND" fill={COLORS[3]} />
        </BarChart>
      </div>
    );
  }
}
