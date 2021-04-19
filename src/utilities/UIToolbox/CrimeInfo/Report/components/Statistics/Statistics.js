import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// local
import Chart from "./components/Chart";
import ReportList from "./components/ReportList";

export default function Statistics() {
  const MyLabelCounterHeader = (props) => (
    <div>
      <ListItemText
        primary={<span style={{ fontSize: 38, color: "orange" }}>{props.counter}</span>}
        secondary={<span style={{ fontSize: 14, color: "white" }}>{props.label}</span>}
      />
    </div>
  );

  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <div
      style={{
        overflowY: "auto",
        height: isPortrait ? window.innerHeight / 1.25 : window.innerWidth / 3,
        marginLeft: -20,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <MyLabelCounterHeader label={"TOTAL REPORTS"} counter={window.innerHeight} />
        <Chart />
        <ReportList />
      </div>
    </div>
  );
}
