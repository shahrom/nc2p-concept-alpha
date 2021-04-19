/*
 * --------------------------------------------------------------------
 * Project: SK2
 * Version: 0.1.1
 * File: PatrolTable.js
 * Created: Wednesday, 18th November 2020 10:37:00 am
 * Modified: Thursday, 19th November 2020 3:21:05 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

// icons
import MOBIcon from "@material-ui/icons/DirectionsWalk";
import MPVIcon from "@material-ui/icons/LocalTaxi";
import PBSIcon from "@material-ui/icons/DirectionsBike";

export default class Zones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patrolList: [],
      totalCount: 0,
      carCount: 0,
      bikeCount: 0,
      footCount: 0,
    };
  }

  componentDidMount() {
    var self = this;
    fetch("data/Crime/PatrolTable.json")
      .then((result) => result.json())
      .then((data) => {
        self.setState({
          patrolList: data,
        });
      })
      .catch(function (err) {
        console.log("Load Data:" + err);
      });
  }

  handleRowSelection = (selectedRows) => {
    var index = parseInt(selectedRows) + 1;
    var param = {
      Receiver: "MAP",
      Command: "PLOT_ZONE_BOUNDARY",
      Data: index,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  handleCallSign(callSign) {}

  render() {
    const MyLabelCounter = (props) => (
      <ListItemText
        primary={
          <span
            style={{
              fontSize: 32,
              color: props.color,
              fontFamily: "Barlow",
              color: "orange",
              fontSize: 35,
              fontWeight: 100,
            }}
          >
            {props.counter}
          </span>
        }
        secondary={<span style={{ fontSize: 12, color: "gray" }}>{props.label}</span>}
        style={{ padding: 0, margin: 0, width: 30 }}
      />
    );

    const childrenSideBySideStyle = {
      display: "flex",
      flexDirection: "row",
    };

    return (
      <div>
        <br />
        <br />
        <br />

        <div style={childrenSideBySideStyle}>
          <div style={{ width: 80 }} />
          <MyLabelCounter label={"TOTAL"} counter={"26"} />
          <div style={{ width: 80 }} />
          <MyLabelCounter label={"MPV"} counter={"6"} />
          <MyLabelCounter label={"URB"} counter={"6"} />
          <MyLabelCounter label={"MOB"} counter={"14"} />
          <MyLabelCounter label={""} counter={""} />
        </div>

        <br />
        <hr style={{ opacity: 0.1, margin: 10 }} />
        <br />

        <div style={{ overflowX: "auto", height: window.innerHeight - 90 }}>
          <Table onRowSelection={this.handleRowSelection} size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span style={{ color: "gray" }}>#</span>
                </TableCell>
                <TableCell>
                  <span style={{ color: "gray" }}>CALLSIGN</span>
                </TableCell>
                <TableCell>
                  <span style={{ color: "gray" }}>TYPE</span>
                </TableCell>
                <TableCell>
                  <span style={{ color: "gray" }}>STATUS</span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {this.state.patrolList.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell style={{ borderBottom: "none" }}>
                    {" "}
                    <span style={{ color: "gray" }}>{index + 1}</span>
                  </TableCell>

                  <TableCell
                    style={{
                      borderBottom: "none",
                    }}
                  >
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "rgba(35,150,200,0.1)",
                      }}
                      onClick={() => this.handleCallSign(row.CallSign)}
                    >
                      {row.CallSign}
                    </Button>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    {row.PatrolTypeId === 3 ? (
                      <MPVIcon style={{ color: "white" }} />
                    ) : row.PatrolTypeId === 1 ? (
                      <MOBIcon style={{ color: "white" }} />
                    ) : (
                      <PBSIcon style={{ color: "white" }} />
                    )}
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <Avatar
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor:
                          row.PatrolStatusName.substring(0, 1) === "P"
                            ? "#2193D3"
                            : row.PatrolStatusName.substring(0, 1) === "D"
                            ? "red"
                            : "gray",
                      }}
                    >
                      {row.PatrolStatusName.substring(0, 1)}
                    </Avatar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />
        </div>
      </div>
    );
  }
}
