/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: InspectionBarChart.js
 * Created: Wednesday, 24th February 2021 2:01:07 pm
 * Modified: Wednesday, 24th February 2021 2:02:09 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import Container from "@material-ui/core/Container";

export default function InspectionBarChart(props) {
  const [data, setData] = React.useState([]);
  const [width, setWidth] = React.useState(0);

  const COLORS = ["#00c0ff", "#1ba716", "#FF8042", "#ff0000", "#7c26cb"];

  React.useEffect(() => {
    var data = [
      {
        name: "HR",
        patrol: 100 - props.updateData,
        inspection: 100,
        arrest: 12,
      },
      {
        name: "COM",
        patrol: 35,
        inspection: 100,
        arrest: 37,
      },
      {
        name: "MOB ",
        patrol: 41,
        inspection: 100,
        arrest: 23,
      },
      {
        name: "LGS",
        patrol: 92,
        inspection: 100,
        arrest: 88,
      },
      {
        name: "FPR",
        patrol: 92,
        inspection: 87,
        arrest: 81,
      },
      {
        name: "TRN ",
        patrol: 41,
        inspection: 100,
        arrest: 85,
      },
    ];

    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.index]);

  React.useEffect(() => {
    var data = [
      {
        name: "HR",
        patrol: 100 - props.updateData,
        inspection: 100,
        arrest: 12,
      },
      {
        name: "COM",
        patrol: 35,
        inspection: 100 - props.updateData,
        arrest: 37,
      },
      {
        name: "MOB ",
        patrol: 41,
        inspection: 100 - props.updateData,
        arrest: 23,
      },
      {
        name: "LGS",
        patrol: 92,
        inspection: 100 - props.updateData,
        arrest: 88,
      },
      {
        name: "FPR",
        patrol: 92,
        inspection: 87,
        arrest: 81,
      },
      {
        name: "TRN ",
        patrol: 41,
        inspection: 100 - props.updateData,
        arrest: 85,
      },
    ];

    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.updateData]);

  // React.useEffect(() => {
  //   var ele = document.getElementById("Army.Slider1"),
  //     eleStyle = window.getComputedStyle(ele);
  //   var eleWidth = eleStyle.width;
  //   var width = eleWidth.replace("px", "");

  //   setWidth(parseInt(width));
  // });

  return (
    <div>
      <p style={{ textAlign: "center", color: "gray" }}>Elements</p>
      <BarChart
        width={window.innerWidth - 80}
        height={150}
        data={data}
        margin={{ top: 0, right: 0, left: -50, bottom: 0 }}
        style={{ marginLeft: -10 }}
      >
        <XAxis
          dataKey="name"
          tick={{
            fontSize: 8,
            fill: "rgba(255,255,255,0.8)",
          }}
        />
        <YAxis
          tick={{
            fontSize: 3,
            fill: "rgba(255,255,255,0.8)",
          }}
        />
        <Bar dataKey="patrol" fill={COLORS[0]} />
        <Bar dataKey="inspection" fill={COLORS[1]} />
        <Bar dataKey="arrest" fill={COLORS[3]} />
      </BarChart>
    </div>
  );
}
