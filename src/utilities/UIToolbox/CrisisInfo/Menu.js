/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: Menu.js
 * Created: Friday, 16th April 2021 1:13:47 pm
 * Modified: Friday, 16th April 2021 1:51:05 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { useSpring, animated } from "react-spring";

// icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CallIcon from "@material-ui/icons/Call";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import VideocamIcon from "@material-ui/icons/Videocam";
import HomeIcon from "@material-ui/icons/Home";

export default function Menu(props) {
  // 1
  const [open, setOpen] = React.useState(true);
  const [photo, setPhoto] = React.useState({});
  const [report, setReport] = React.useState([]);
  // Force update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const animLayout = useSpring({
    opacity: open ? 1 : 0,
    config: {
      duration: 500,
    },
  });

  React.useEffect(() => {
    getIncidentList();
  }, []);

  const getIncidentList = () => {
    fetch("data/Crisis/Location.json")
      .then((result) => result.json())
      .then((data) => {
        var location = data;

        fetch("data/Crisis/Report.json")
          .then((result) => result.json())
          .then((data) => {
            var report = data;

            for (var i = 0; i < report.length; i++) {
              report[i].Latitude = location[i].Latitude;
              report[i].Longitude = location[i].Longitude;
              report[i].Location = location[i].Location;
            }

            setReport(report);

            var param = {
              Receiver: "CRISIS_MAP",
              Command: "PLOT_INCIDENT_SYMBOLS",
              Data: report,
            };
            window.MessageDispatcher.TriggerMessageDispatcher(param);
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const MyIconLabel = (props) => (
    <ListItem>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText
        primary={<span style={{ fontSize: 14 }}>{props.label}</span>}
      />
    </ListItem>
  );

  const handleExpandClick = (index) => {
    var r = [];
    r = report;
    for (var i = 0; i < r.length; i++) {
      if (index === i) {
        r[i].Expand = !r[i].Expand;
      } else {
        r[i].Expand = false;
      }
    }

    setReport(r);
    forceUpdate();
  };

  const handleZoomToIncident = (item) => {
    var param = {
      Receiver: "CRISIS_MAP",
      Command: "ZOOM_TO_LOCATION",
      Data: {
        Zoom: 15,
        Latitude: item.Latitude,
        Longitude: item.Longitude,
      },
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  const handleDetailReport = (id) => {
    window.ViewStateManager.DisplayCrisisDetail(id);
  };

  return (
    <animated.div style={animLayout}>
      <div
        style={{
          overflow: "auto",
          height: window.innerHeight - 90,
          backgroundColor: "rgba(0,0,0,0.2)",
          margin: 5,
        }}
      >
        <div style={{ overflow: "auto", height: window.innerHeight }}>
          <List>
            {report.map((row, index) => (
              <div style={{ display: row.Display ? "block" : "none" }}>
                <Card
                  style={{
                    margin: 5,
                    backgroundColor: "rgba(43,54,79,0.4)",
                  }}
                >
                  <CardHeader
                    action={
                      <IconButton
                        onClick={() => handleZoomToIncident(row)}
                        style={{ outline: "none" }}
                      >
                        <LocationOnIcon style={{ color: "orange" }} />
                      </IconButton>
                    }
                    title={
                      <div>
                        <div style={childrenSideBySideStyle}>
                          <span
                            style={{
                              color: row.ReportColor,
                              fontSize: "22px",
                            }}
                          >
                            {row.ReportTypeName.toUpperCase()}
                          </span>
                        </div>

                        <Divider
                          style={{ backgroundColor: "gray", marginTop: 5 }}
                        />
                      </div>
                    }
                  />

                  <CardContent
                    style={{
                      color: "orange",
                      padding: 0,
                      marginLeft: 15,
                      marginTop: -10,
                    }}
                  >
                    <Typography
                      style={{ color: "orange", padding: "5px 20px 5px 0px" }}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <span style={{ color: "#B8BDC7" }}>
                        {row.Originator === "MOBILE-APP"
                          ? photo.DateTime
                          : row.CreatedDateTime.substring(0, 16).replace(
                              "T",
                              " @ "
                            )}
                      </span>
                      <div style={{ width: 10 }} />
                      {row.Location}
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing style={{ outline: "none" }}>
                    <Button
                      style={{
                        border: "none",
                        outline: "none",
                        color: "#00A2E8",
                      }}
                      onClick={() => handleExpandClick(index)}
                      startIcon={<BookmarkIcon />}
                    >
                      REPORT INFO
                    </Button>
                    <IconButton
                      style={{ color: "#00A2E8", outline: "none" }}
                      onClick={() => handleExpandClick(index)}
                    >
                      {row.Expand ? (
                        <ExpandLess style={{ color: "#00A2E8" }} />
                      ) : (
                        <ExpandMore style={{ color: "#00A2E8" }} />
                      )}
                    </IconButton>
                  </CardActions>

                  <Collapse in={row.Expand} timeout="auto" unmountOnExit>
                    <Divider
                      style={{
                        margin: "0px 15px",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <CardContent style={{ color: "#B8BDC7" }}>
                      <div>
                        <img
                          src={row.MediaLink}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block",
                          }}
                        />
                      </div>
                      <MyIconLabel
                        icon={
                          <ListItemIcon>
                            <AssignmentLateIcon style={{ color: "#F50057" }} />
                          </ListItemIcon>
                        }
                        label={row.ReportTypeName}
                      />
                      <MyIconLabel
                        icon={
                          <ListItemIcon>
                            <LocationOnIcon style={{ color: "#F50057" }} />
                          </ListItemIcon>
                        }
                        label={row.Location}
                      />
                      <MyIconLabel
                        icon={
                          <ListItemIcon>
                            <QueryBuilderIcon style={{ color: "#F50057" }} />
                          </ListItemIcon>
                        }
                        label={row.CreatedDateTime.substring(0, 16).replace(
                          "T",
                          " @ "
                        )}
                      />
                      <MyIconLabel
                        icon={
                          <Avatar
                            style={{
                              width: 25,
                              height: 25,
                              marginTop: 3,
                              backgroundColor: "rgba(255,0,0,0.5)",
                            }}
                            src={"img/logo/" + row.Originator + ".png"}
                          />
                        }
                        label={row.Originator}
                      />

                      <div
                        style={{
                          display: row.Originator === "CCTV" ? "block" : "none",
                        }}
                      >
                        <MyIconLabel
                          icon={
                            <ListItemIcon>
                              <VideocamIcon style={{ color: "#F50057" }} />
                            </ListItemIcon>
                          }
                          label={row.DeviceName}
                        />
                      </div>

                      <div
                        style={{
                          display: row.Originator != "CCTV" ? "block" : "none",
                        }}
                      >
                        <MyIconLabel
                          icon={
                            <ListItemIcon>
                              <PersonIcon style={{ color: "#F50057" }} />
                            </ListItemIcon>
                          }
                          label={row.CallerName}
                        />
                        <MyIconLabel
                          icon={
                            <ListItemIcon>
                              <CallIcon style={{ color: "#F50057" }} />
                            </ListItemIcon>
                          }
                          label={row.CallerPhone}
                        />
                      </div>

                      <Divider
                        style={{
                          margin: "0px 0px",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                      />
                      <br />

                      <Button
                        onClick={() => handleDetailReport(row.ReportId)}
                        variant="contained"
                        style={{
                          outline: "none",
                          color: "white",
                          backgroundColor: "#0088FE",
                        }}
                      >
                        REPORTS
                      </Button>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            ))}
          </List>
        </div>
      </div>
    </animated.div>
  );
}
