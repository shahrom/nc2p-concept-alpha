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

export default function InspectionBarChart(props) {
  const [data, setData] = React.useState([]);

  const COLORS = ["#00c0ff", "#1ba716", "#FF8042", "#ff0000", "#7c26cb"];

  React.useEffect(() => {
    var data = [
      {
        name: "Semenanjung",
        patrol: 33,
        inspection: 67,
      },
      {
        name: "Sabah/Sarawak",
        patrol: 12,
        inspection: 88,
      },
    ];

    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.index]);

  return (
    <div>
      <BarChart
        width={700}
        height={400}
        data={data}
        margin={{ top: 0, right: 30, left: 0, bottom: 50 }}
      >
        <XAxis
          dataKey="name"
          tick={{
            fontSize: 14,
            fill: "rgba(255,255,255,0.8)",
          }}
        />
        <YAxis
          tick={{
            fontSize: 14,
            fill: "rgba(255,255,255,0.8)",
          }}
        />
        <Bar dataKey="patrol" fill={"green"} />
        <Bar dataKey="inspection" fill={"red"} />
      </BarChart>
    </div>
  );
}
