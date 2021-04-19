/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: MainView.js
 * Created: Wednesday, 24th February 2021 10:41:03 pm
 * Modified: Wednesday, 24th February 2021 11:03:53 pm
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
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";

export default function MediaList() {
  // 1
  const [report, setReport] = React.useState([]);

  React.useEffect(() => {
    getReportList();
  }, []);

  const getReportList = () => {
    fetch("data/Crisis/DetailReport.json")
      .then((result) => result.json())
      .then((data) => {
        setReport(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div style={{ overflow: "auto", height: window.innerHeight }}>
      <br />
      <br />
      <List>
        {report.map((row, index) => (
          <div>
            <ListItem>
              <ListItemIcon>
                <Avatar
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  <IconButton>
                    <div style={{ color: "white" }}>{index + 1}</div>
                  </IconButton>
                </Avatar>
              </ListItemIcon>

              {/* // Title */}
              <ListItemText
                primary={
                  <span style={{ color: "white" }}>
                    {row.ReportTypeName.toUpperCase()}
                  </span>
                }
                secondary={
                  <span
                    style={{
                      color: "black",
                      fontSize: "12px",
                      color: "white",
                    }}
                  >
                    {row.CreatedDateTime.substring(0, 16).replace("T", " @ ")}
                  </span>
                }
                style={{ color: "black", fontSize: "16px", opacity: 0.8 }}
              />
            </ListItem>

            <Collapse in={true} timeout="auto" unmountOnExit>
              <div>
                <div style={{ padding: "10px" }}>
                  <Card
                    style={{
                      backgroundColor: "rgba(0,0,0,0)",
                      padding: "5px",
                    }}
                  >
                    <CardMedia>
                      <div>
                        <img src={row.MediaLink} />
                      </div>

                      <br />
                      <p style={{ fontSize: 18, color: "white" }}>
                        {row.CreatedByFullName.toUpperCase()}
                      </p>

                      <p style={{ fontSize: 14, color: "gray" }}>
                        {row.Description}
                      </p>
                    </CardMedia>
                  </Card>

                  <br />

                  <Divider
                    style={{
                      marginTop: -10,
                      backgroundColor: "gray",
                    }}
                  />
                </div>
              </div>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
}
