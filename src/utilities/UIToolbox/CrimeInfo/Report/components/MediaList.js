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
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// icons
import InfoIcon from "@material-ui/icons/Info";

export default function MediaList(props) {
  // 1
  const [report, setReport] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  React.useEffect(() => {
    getReportList();
  }, []);

  React.useEffect(() => {
    getReportList();
  }, [isMobile]);

  const getReportList = () => {
    fetch("data/Crime/Location.json")
      .then((result) => result.json())
      .then((data) => {
        var location = data;

        fetch("data/Crime/Report.json")
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
              Receiver: "CRIME_MAP",
              Command: "PLOT_REPORT_SYMBOLS",
              Data: report,
            };
            window.MessageDispatcher.TriggerMessageDispatcher(param);

            var param = {
              Receiver: "CRIME_MOBILE_MAP",
              Command: "PLOT_REPORT_SYMBOLS",
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

  const populateData = (data) => {
    var sortedList = [];
    // DataAdater ===================================
    for (var i = 0; i < data.length; i++) {
      sortedList.push(data[i]);
    }
    // =============================================

    this.setState({ listOfReports: sortedList });
  };

  const handleTouchTap = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  const handleImageLoaded = () => {
    this.setState({ progressStatus: "hide" });
    this.setState({ imageMarginTop: "-50px" });
  };

  const handleImageErrored = () => {
    this.setState({ progressStatus: "failed to load" });
  };

  const handleRefreshList = () => {
    var self = this;
    self.loadMedia();
  };

  const loadMedia = () => {
    this.dataService.GetMediaList(this.props.eventId, function (data) {
      this.populateData(data);
    });
  };

  const handleFullReport = () => {
    this.setState({ openDialog: true });
  };

  const handleOKDialog = () => {
    this.setState({ openDialog: false });
  };

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const valueFalse = false;

  const logoStyle = {
    borderRadius: "0px",
    width: "80px",
    height: "95px",
    marginBottom: "30px",
    backgroundColor: "#FFFF",
    alignSelf: "center",
    marginLeft: "360px",
  };

  const formationStyle = {
    textAlign: "center",
    marginTop: "-10px",
    color: "black",
  };

  return (
    <div style={{ backgroundColor: "", height: "100vh" }}>
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

                      <p style={{ fontSize: 14, color: "gray" }}>{row.Description}</p>
                      <Button
                        style={{
                          border: "none",
                          outline: "none",
                          color: "#0375ED",
                        }}
                        onClick={() => this.handleFullReport()}
                        startIcon={<InfoIcon />}
                      >
                        REPORT
                      </Button>
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

      <Dialog
        style={{
          backgroundColor: "transparent",
          backdropFilter: "blur(2px)",
        }}
        open={openDialog}
        onClose={() => this.handleOKDialog()}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle style={{ backgroundColor: "#0375ED", color: "white" }}>
          REPORT
        </DialogTitle>
        <DialogContent
          style={{
            // backgroundColor: "yellow",
            background: "none",
            width: 900,
            marginLeft: 30,
          }}
        >
          <DialogContentText style={{ padding: 10 }}>
            <div style={childrenSideBySideStyle}>
              <div style={{ padding: "10px" }}>
                <div>
                  <Avatar style={logoStyle} src="img/logo/logo_ppm.png" />
                  <h5 style={formationStyle}>PASUKAN POLIS MARIN</h5>
                  <br />
                  <h4 style={formationStyle}>LAPORAN TANGKAPAN / RAMPASAN</h4>
                  <hr />
                </div>

                <div>
                  <Table>
                    <TableHeader
                      adjustForCheckbox={valueFalse}
                      style={{ display: "none" }}
                    >
                      <TableRow>
                        <TableHeaderColumn style={{ width: "5px" }}>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={valueFalse}>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn style={{ width: "5px" }}>[A]</TableRowColumn>
                        <TableRowColumn style={{ width: "150px" }}>
                          TARIKH / MASA
                        </TableRowColumn>
                        <TableRowColumn>10/1/2021 @ 0146 HRS</TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn>[B]</TableRowColumn>
                        <TableRowColumn>NO. BOT</TableRowColumn>
                        <TableRowColumn>JHF 4722 / JENIS SPEED BOT</TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn>[C]</TableRowColumn>
                        <TableRowColumn>KEDUDUKAN</TableRowColumn>
                        <TableRowColumn>
                          LAT: 102.004 <br /> LONG: 101.899040 <br /> (JARAK L/KURANG 7 BN
                          DARI PITAS)
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn style={{ paddingTop: "20px" }}>
                          [D]
                        </TableRowColumn>
                        <TableRowColumn style={{ paddingTop: "20px" }}>
                          PEMILIK
                        </TableRowColumn>
                        <TableRowColumn
                          style={{ paddingTop: "20px", overflow: "hidden" }}
                        >
                          LAU MIANG SENG <br /> NO. K/P: 681227-01-5407
                          <br /> ALAMAT: NO. 106, JLN BANDAR 7, TAMAN BENUT, PITAS
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn style={{ paddingTop: "20px" }}>
                          [E]
                        </TableRowColumn>
                        <TableRowColumn style={{ paddingTop: "20px" }}>
                          TEKONG
                        </TableRowColumn>
                        <TableRowColumn
                          style={{
                            paddingTop: "20px",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          SUHAIDI BIN TIMBUL <br /> NO. K/P: 651229-12-5303 <br /> ALAMAT:
                          KG. BATU ARANG NO. 1, 97007 PITAS
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn>[F]</TableRowColumn>
                        <TableRowColumn>AWAK-AWAK</TableRowColumn>
                        <TableRowColumn>4 ORANG WARGANEGARA TEMPATAN</TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn>[G]</TableRowColumn>
                        <TableRowColumn>NO. LESEN BOT</TableRowColumn>
                        <TableRowColumn>
                          E 006775 / TARIKH TAMAT: 11/07/2021
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn>[H]</TableRowColumn>
                        <TableRowColumn>KESALAHAN</TableRowColumn>
                        <TableRowColumn
                          style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          SEK. 135 (1) (E) AKTA KASTAM 1967
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn>[I]</TableRowColumn>
                        <TableRowColumn>BARANG KES</TableRowColumn>
                        <TableRowColumn>
                          223 BOTOL MINUMAN KERAS PELBAGAI JENIS, 185 BUNGKUS TEMBAKAU
                          KUDA TERBANG, 200 BUNGKUS TEMBAKAU SIRIH, 440 BUNGKUS TEMBAKAU
                          SALAK
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn>[J]</TableRowColumn>
                        <TableRowColumn>TINDAKAN</TableRowColumn>
                        <TableRowColumn
                          style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          DISERAHKAN KEPADA PEGAWAI PENYIASAT JABATAN KASTAM PITAS
                        </TableRowColumn>
                      </TableRow>
                      <TableRow displayBorder={valueFalse}>
                        <TableRowColumn>[K]</TableRowColumn>
                        <TableRowColumn>REPOT NO.</TableRowColumn>
                        <TableRowColumn>PITAS RPT:1648/2021</TableRowColumn>
                      </TableRow>
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableRowColumn
                          style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        ></TableRowColumn>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>

                <CardMedia>
                  <div>
                    <div>
                      <div
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                        key={"img/reports/kastam/ops1.jpg"}
                      >
                        <img src={"img/reports/kastam/ops1.jpg"} />
                      </div>
                    </div>
                  </div>

                  <br />
                  <p style={{ fontSize: 18, color: "red" }}>
                    {"SEK. 135 (1) (E) AKTA KASTAM 1967"}
                  </p>

                  <p style={{ fontSize: 14, color: "gray" }}>
                    {
                      "BOTRONDA RH 19 SEMASA TUGAS OP TANGO PAPA TELAH TAHAN/PERIKSA SEBUAH BOT PENUMPANG DI LOKASI. HASIL PEMERIKSAAN MENJUMPAI BARANG KES SEPERTI DIATAS DISYAKI DIBAWA KELUAR UNTUK PASARAN NEGARA JIRAN. SETERUSNYA BARANG KES DIBAWA KE MO PPM SANDAKAN UNTUK TINDAKAN SELANJUTNYA"
                    }
                  </p>
                </CardMedia>
                <CardContent>
                  <div
                    style={{
                      color: "#FF0000",
                      fontSize: 14,
                      marginLeft: -20,
                    }}
                  >
                    <p>
                      <strong>TANGKAPAN</strong>: {"4 ORANG WARGANEGARA TEMPATAN"}
                    </p>
                    <p>
                      <strong>RAMPASAN</strong>:{" "}
                      {
                        "223 BOTOL MINUMAN KERAS PELBAGAI JENIS, 185 BUNGKUS TEMBAKAU KUDA TERBANG, 200 BUNGKUS TEMBAKAU SIRIH, 440 BUNGKUS TEMBAKAU SALAK"
                      }
                    </p>
                    <p>
                      <strong>NILAI RAMPASAN</strong>: {"RM 460.00"}
                    </p>
                    <p>
                      <strong>BOT</strong>: {"JHF 4722 / JENIS SPEED BOT"}
                    </p>
                  </div>
                </CardContent>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "white", padding: 20 }}>
          <Divider
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          />
          <br />
          <Button
            style={{ outline: "none" }}
            onClick={() => this.handleOKDialog()}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
