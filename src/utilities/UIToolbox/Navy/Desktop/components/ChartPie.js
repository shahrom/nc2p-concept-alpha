import React, { useState, useEffect } from "react";
import { PieChart, PieArcSeries } from "reaviz";

export function ChartPie1() {
  const [data, setData] = useState([
    { key: "PATROL", data: 22 },
    { key: "SUPPORT", data: 45 },
    { key: "TRAINING", data: 26 },
    { key: "STRIKE", data: 8 },
  ]);

  // const height = 250;
  // const width = 350;
  // const padAngle = 0.02;
  // const padRadius = 200;
  // const cornerRadius = 4;

  // return (
  //   <PieChart
  //     width={width}
  //     height={height}
  //     data={data}
  //     series={
  //       <PieArcSeries
  //         cornerRadius={cornerRadius}
  //         padAngle={padAngle}
  //         padRadius={padRadius}
  //         doughnut={true}
  //         colorScheme={["#0088FE", "#1BA716", "orange", "red"]}
  //       />
  //     }
  //   />
  // );

  return (
    <div style={{ marginLeft: 150 }}>
      <PieChart
        height={250}
        width={300}
        data={data}
        // displayAllLabels={false}
        series={
          <PieArcSeries
            cornerRadius={4}
            padAngle={0.02}
            padRadius={200}
            doughnut={true}
            colorScheme={["#0088FE", "#1BA716", "orange", "red"]}
          />
        }
      />
    </div>
  );
}
