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
        name: "ARMADA",
        patrol: 100,
        inspection: 100,
        arrest: 12,
        tag: 12,
      },
      {
        name: "MAWILLA 1",
        patrol: 35,
        inspection: 100,
        arrest: 37,
        tag: 37,
      },
      {
        name: "MAWILLA 2 ",
        patrol: 41,
        inspection: 100,
        arrest: 23,
        tag: 23,
      },
    ];

    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.index]);

  return (
    <div style={{ marginLeft: 30 }}>
      <BarChart
        width={800}
        height={550}
        data={data}
        margin={{ top: 55, right: 30, left: 0, bottom: 50 }}
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
        <Bar dataKey="patrol" fill={COLORS[0]} />
        <Bar dataKey="inspection" fill={COLORS[1]} />
        <Bar dataKey="arrest" fill={COLORS[3]} />
        <Bar dataKey="tag" fill={COLORS[2]} />
      </BarChart>
    </div>
  );
}
