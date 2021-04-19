/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: BarChartView.js
 * Created: Thursday, 25th March 2021 10:21:32 pm
 * Modified: Wednesday, 31st March 2021 12:19:05 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Brush,
} from "recharts";

export default function BarChartView(props) {
  var countVANDALISM;
  var countPOTHOLES;
  var countWASTE;

  const processData = (data) => {
    if (data == undefined) return;

    var data1 = [];

    for (var i = 1; i <= 31; i++) {
      countVANDALISM = 0;
      countPOTHOLES = 0;
      countWASTE = 0;

      for (var k = 0; k < data.length; k++) {
        var startDate = new Date("07/" + i + "/2018").getTime();
        var dataDate = new Date(data[k].DispatchDate).getTime();
        if (startDate == dataDate) {
          countReportType(data[k].IncidentTypeName);
        }
      }

      data1.push({
        name: i,
        VANDALISM: countVANDALISM,
        WASTE: countWASTE,
        POTHOLES: countPOTHOLES,
      });
    }

    return data1;
  };

  const countReportType = (reportType) => {
    var type = reportType.replace(/\s/g, "");

    switch (type.toUpperCase()) {
      case "VANDALISM":
        countVANDALISM++;
        break;
      case "WASTE":
        countWASTE++;
        break;
      case "POTHOLES":
        countPOTHOLES++;
        break;
    }
  };

  return (
    <div
      style={{
        marginTop: -30,
        // backgroundColor: "rgba(66,76,101,0.5)",
        // width: 840,
      }}
    >
      <BarChart
        width={window.innerWidth - 900}
        height={250}
        data={processData(props.data)}
        margin={{ top: 30, right: 20, left: 0, bottom: 70 }}
      >
        <XAxis dataKey="name" />
        <YAxis />

        <ReferenceLine y={0} stroke="#8884d8" />
        <Brush
          dataKey="name"
          height={30}
          stroke="#8884d8"
          onChange={(val) => props.handleSliderChange(val)}
        />
        <Bar dataKey="VANDALISM" stackId="a" fill="#B200FF" />
        <Bar dataKey="WASTE" stackId="a" fill="green" />
        <Bar dataKey="POTHOLES" stackId="a" fill="red" />
      </BarChart>
    </div>
  );
}
