import React from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import Subheader from "material-ui/Subheader";

export default function MyPieChart(props) {
  var countLocation1 = 0;
  var countLocation2 = 0;
  var countLoation3 = 0;
  var countLocation4 = 0;
  var countLocation5 = 0;
  var countLocation6 = 0;
  var countLocation7 = 0;
  var countLocation8 = 0;
  var countLocation9 = 0;

  const processData = (data) => {
    countLocation1 = 0;
    countLocation2 = 0;
    countLoation3 = 0;
    countLocation4 = 0;
    countLocation5 = 0;
    countLocation6 = 0;
    countLocation7 = 0;
    countLocation8 = 0;
    countLocation9 = 0;

    if (data == undefined) return;

    for (var i = 0; i < data.length; i++) {
      countReportType(data[i].District);
    }

    var data1 = [];

    if (countLocation1 >= 0) {
      var val1 = { name: "SEKAMA", value: countLocation1 };
      data1.push(val1);
    }
    if (countLocation2 >= 0) {
      var val2 = { name: "TAMAN DAYA", value: countLocation2 };
      data1.push(val2);
    }
    if (countLocation4 >= 0) {
      var val3 = { name: "WESTWOOD", value: countLocation4 };
      data1.push(val3);
    }
    if (countLoation3 >= 0) {
      var val4 = { name: "TAMAN PUTIH", value: countLoation3 };
      data1.push(val4);
    }
    if (countLocation5 >= 0) {
      var val5 = { name: "TAMAN FLORA", value: countLocation5 };
      data1.push(val5);
    }
    if (countLocation6 >= 0) {
      var val6 = { name: "TAMAN MENDU", value: countLocation6 };
      data1.push(val6);
    }
    if (countLocation7 >= 0) {
      var val7 = { name: "TABUAN HEIGHTS", value: countLocation7 };
      data1.push(val7);
    }
    if (countLocation8 >= 0) {
      var val8 = { name: "TAMAN RIDGEWAY", value: countLocation8 };
      data1.push(val8);
    }
    if (countLocation9 >= 0) {
      var val8 = { name: "HAPPY GARDEN", value: countLocation8 };
      data1.push(val8);
    }

    return data1;
  };

  const countReportType = (reportType) => {
    // var type = reportType.replace(/\s/g, "");
    var type = reportType;

    switch (type.toUpperCase()) {
      case "SEKAMA":
        countLocation1++;
        break;

      case "TAMAN DAYA":
        countLocation2++;
        break;

      case "WESTWOOD":
        countLoation3++;
        break;

      case "TAMAN PUTIH":
        countLocation4++;
        break;

      case "TAMAN FLORA":
        countLocation5++;
        break;

      case "TAMAN MENDU":
        countLocation6++;
        break;

      case "TAMAN HEIGHTS":
        countLocation7++;
        break;

      case "TAMAN RIDGEWAY":
        countLocation8++;
        break;

      case "HAPPY GARDEN":
        countLocation9++;
        break;
    }
  };

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    value,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return value > 0 ? (
      <text
        style={{ fontSize: "12px" }}
        x={x - 0}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {name + ": " + value}
      </text>
    ) : (
      <div></div>
    );
  };

  return (
    <div>
      <Subheader
        style={{
          marginTop: 0,
          marginLeft: 150,
          fontSize: 16,
          padding: 5,
          color: "gray",
          lineHeight: "0px",
        }}
      >
        LOCATIONS
      </Subheader>
      <PieChart
        width={330}
        height={330}
        style={{ marginLeft: 30, backgroundColor: "" }}
      >
        <Pie
          data={processData(props.data)}
          cx={160}
          cy={120}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
        >
          <Cell key="SEKAMA" fill="#005FAB" />
          <Cell key="TAMAN DAYA" fill="#B200FF" />
          <Cell key="WESTWOOD" fill="red" />
          <Cell key="TAMAN PUTIH" fill="orange" />
          <Cell key="TAMAN FLORA" fill="#007F0E" />
          <Cell key="TAMAN MENDU" fill="#785241" />
          <Cell key="TAMAN HEIGHTS" fill="#84C135" />
          <Cell key="TAMAN RIDGEWAY" fill="#07B2DE" />
          <Cell key="HAPPY GARDEN" fill="#2B364F" />
        </Pie>
      </PieChart>
    </div>
  );
}
