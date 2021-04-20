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
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function InspectionBarChart(props) {
  const [data, setData] = React.useState([]);

  const COLORS = ["#00c0ff", "#1ba716", "#FF8042", "#ff0000", "#7c26cb"];

  React.useEffect(() => {
    var data = [
      {
        name: "HR",
        patrol: 100,
        inspection: 100,
        arrest: 12,
      },
      {
        name: "COMMS",
        patrol: 35,
        inspection: 100,
        arrest: 37,
      },
      {
        name: "MOBILITY ",
        patrol: 41,
        inspection: 100,
        arrest: 23,
      },
      {
        name: "LOGISTIC",
        patrol: 92,
        inspection: 100,
        arrest: 88,
      },
      {
        name: "FIRE POWER",
        patrol: 92,
        inspection: 87,
        arrest: 81,
      },
      {
        name: "TRAINING ",
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

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div>
      {isMobile ? (
        <BarChart
          width={450}
          height={150}
          data={data}
          margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
          style={{ marginLeft: -10 }}
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
        </BarChart>
      ) : (
        <BarChart
          width={800}
          height={350}
          data={data}
          margin={{ top: 55, right: 30, left: 0, bottom: 50 }}
          style={{ marginLeft: -20 }}
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
        </BarChart>
      )}
    </div>
  );
}
