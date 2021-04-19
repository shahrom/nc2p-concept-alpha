/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: PatrolTable.js
 * Created: Friday, 16th April 2021 1:13:47 pm
 * Modified: Friday, 16th April 2021 2:09:40 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

// components
import Statistics from "./Statistics/Statistics";

// icons
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import VideocamIcon from "@material-ui/icons/Videocam";

export default function PatrolTable() {
  const [zoneList, setZoneList] = React.useState([]);

  React.useEffect(() => {
    fetch("data/Crime/PatrolZone.json")
      .then((result) => result.json())
      .then((data) => {
        setZoneList(data);
      })
      .catch(function (err) {
        console.log("GetDistrictPatrolData:" + err);
      });
  }, []);

  const handleRowSelection = (index) => {
    // 2. Zoom on map to zone boundary
    var param = {
      Receiver: "MAP_FUNCTIONS",
      Command: "PLOT_ZONE_BOUNDARY",
      Data: index + 1,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const onClickZone = (id) => {
    window.ViewStateManager.DisplayZoneDetail(id);
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const MyLabelCounter = (props) => (
    <ListItemText
      primary={
        <span
          style={{
            fontSize: 32,
            color: props.color,
            fontFamily: "Barlow",
            color: "cyan",
            fontSize: 35,
            fontWeight: 100,
          }}
        >
          {props.counter}
        </span>
      }
      secondary={
        <span style={{ fontSize: 12, color: "gray" }}>{props.label}</span>
      }
      style={{ padding: 0, margin: 0, width: 30 }}
    />
  );

  return (
    <div style={{ padding: "20px" }}>
      <Statistics />
      <div>
        <div style={{ textAlign: "center", color: "#B8BDC7" }}>
          <div style={childrenSideBySideStyle}>
            <MyLabelCounter label={"MPV"} counter={"51"} color={"#B8BDC7"} />
            <div style={{ borderLeft: "0px solid gray", height: "50px" }}></div>
            <MyLabelCounter label={"URB"} counter={"94"} color={"#B8BDC7"} />
            <div style={{ borderLeft: "0px solid gray", height: "50px" }}></div>
            <MyLabelCounter label={"MOB"} counter={"143"} color={"#B8BDC7"} />
            <div style={{ borderLeft: "0px solid gray", height: "50px" }}></div>
            <MyLabelCounter label={"CCTV"} counter={"108"} color={"#B8BDC7"} />
          </div>
        </div>
        <br />
        <br />

        <div style={{ overflowX: "auto", height: "550px" }}>
          <Table style={{ color: "black" }} size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ width: "150px", padding: "0px", color: "gray" }}
                ></TableCell>
                <TableCell style={{ color: "#B8BDC7" }}></TableCell>
                <TableCell style={{}}>
                  <LocalTaxiIcon style={{ color: "#207FA8" }} />
                </TableCell>
                <TableCell style={{ color: "#207FA8" }}>
                  <DirectionsBikeIcon />
                </TableCell>
                <TableCell style={{ color: "#207FA8" }}>
                  <DirectionsWalkIcon />
                </TableCell>
                <TableCell style={{ color: "#207FA8" }}>
                  <VideocamIcon />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {zoneList.map((row, index) => (
                <TableRow
                  hover
                  onClick={() => handleRowSelection(index)}
                  key={index}
                >
                  <TableCell
                    style={{
                      width: "150px",
                      padding: "0px",
                      borderBottom: "none",
                    }}
                  >
                    <Button
                      style={{
                        color: "#2396C8",
                        outline: "none",
                        backgroundColor: "rgba(35,150,200,0.1)",
                        width: 140,
                      }}
                      onClick={() => onClickZone(row.ZoneId)}
                    >
                      <span style={{ fontSize: 13 }}>{row.Name}</span>
                    </Button>
                  </TableCell>
                  <TableCell
                    style={{ widthx: "20px", borderBottom: "none" }}
                  ></TableCell>

                  <TableCell style={{ widthx: "20px", borderBottom: "none" }}>
                    <Avatar
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "rgba(0,0,0,0)",
                      }}
                    >
                      {row.PPM}
                    </Avatar>
                  </TableCell>

                  <TableCell style={{ widthx: "20px", borderBottom: "none" }}>
                    <Avatar
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "rgba(0,0,0,0)",
                      }}
                    >
                      <span style={{ color: "#B8BDC7" }}>{row.APMM}</span>
                    </Avatar>
                  </TableCell>

                  <TableCell style={{ widthx: "20px", borderBottom: "none" }}>
                    <Avatar
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "rgba(0,0,0,0)",
                      }}
                    >
                      {row.TDM}
                    </Avatar>
                  </TableCell>

                  <TableCell style={{ widthx: "20px", borderBottom: "none" }}>
                    <Avatar
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "rgba(0,0,0,0)",
                      }}
                    >
                      {row.CCTV}
                    </Avatar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
