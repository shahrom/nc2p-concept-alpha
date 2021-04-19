import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

// local
import Chart from "./components/Chart";
import ReportList from "./components/ReportList";

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: [],
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ reportData: newProps.reportData });
  }

  render() {
    const MyLabelCounterHeader = (props) => (
      <div
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <ListItemText
          primary={
            <span style={{ fontSize: 38, color: "orange" }}>
              {props.counter}
            </span>
          }
          secondary={
            <span style={{ fontSize: 14, color: "white" }}>{props.label}</span>
          }
        />
      </div>
    );

    return (
      <div style={{ textAlign: "center" }}>
        <MyLabelCounterHeader label={"TOTAL REPORTS"} counter={12} />
        <Chart />
        {/* <ReportList reportData={this.state.reportData} /> */}
        {/* <Divider style={{ margin: 5 }} /> */}
      </div>
    );
  }
}
