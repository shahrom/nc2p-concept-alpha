/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: BarChart.js
 * Created: Sunday, 21st February 2021 4:11:29 pm
 * Modified: Monday, 22nd February 2021 11:13:59 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { RadialGuideBar } from "reaviz";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function MyBarChart(props) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    var data = [
      { name: "Fighter", RED: 63 },
      { name: "Maritime", RED: 50 },
      { name: "Transport", RED: 52 },
      { name: "Helicopter", RED: 58 },
      { name: "VVIP/VIP", GREEN: 85 },
      { name: "Training", RED: 54 },
    ];
    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.index]);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        <text
          y={y + 20}
          x={x + width + 17}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <div style={{ opacity: 0.8 }}>
      <BarChart
        width={600}
        height={400}
        data={data}
        layout="vertical"
        margin={{ top: 15, right: 0, left: 90, bottom: 50 }}
      >
        <XAxis type="number" />
        <YAxis
          tickLine={{ stroke: "white" }}
          type="category"
          dataKey="name"
          tick={{
            fontSize: 16,
            color: "white",
            fill: "rgba(255,255,255,0.8)",
          }}
        />
        <Bar dataKey="GREEN" stackId="a" fill={"green"}>
          <LabelList dataKey="GREEN" content={renderCustomizedLabel} />
        </Bar>
        <Bar dataKey="ORANGE" stackId="a" fill={"orange"}>
          <LabelList dataKey="ORANGE" content={renderCustomizedLabel} />
        </Bar>
        <Bar dataKey="RED" stackId="a" fill="red">
          <LabelList dataKey="RED" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
      <br />
      <br />
      <br />
    </div>
  );
}
