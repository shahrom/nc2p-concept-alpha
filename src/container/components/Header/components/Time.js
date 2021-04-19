import React from "react";

export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      today: "",
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.setState({
      today: this.getToday(),
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  getToday() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if (month.toString().length === 1) {
      month = "0" + month;
    }
    if (day.toString().length === 1) {
      day = "0" + day;
    }
    if (hour.toString().length === 1) {
      hour = "0" + hour;
    }
    if (minute.toString().length === 1) {
      minute = "0" + minute;
    }
    if (second.toString().length === 1) {
      second = "0" + second;
    }

    var dateTime = this.getDay() + ", " + this.getMonth() + " " + day + " " + year;

    return dateTime;
  }

  getDay() {
    var now = new Date();
    var days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    var day = days[now.getDay()];
    return day;
  }

  getMonth() {
    var now = new Date();
    var months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    var month = months[now.getMonth()];
    return month;
  }

  render() {
    return (
      <div style={{ marginTop: "-5px" }}>
        <p style={{ color: "#C7CACF", fontSize: "18px", marginTop: "10px" }}>
          {this.state.today} {this.state.date.toLocaleTimeString()}
        </p>
      </div>
    );
  }
}
