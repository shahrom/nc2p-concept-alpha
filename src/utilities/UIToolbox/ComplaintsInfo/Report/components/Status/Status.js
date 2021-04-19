import React from "react";

// local
import ChartPie from "./components/ChartPie";
import ReportList from "./components/ReportList";

export default class Statistics extends React.Component {
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
    return (
      <div>
        <br />
        <br />
        <ChartPie />
        <hr style={{ borderColor: "gray" }} />
        <ReportList reportData={this.state.reportData} />
      </div>
    );
  }
}
