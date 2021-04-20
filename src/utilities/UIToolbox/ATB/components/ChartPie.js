import React, { useState, useEffect } from "react";
import { PieChart, PieArcSeries } from "reaviz";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function ChartPie1() {
  const [data, setData] = useState([
    { key: "PATROL", data: 22 },
    { key: "SUPPORT", data: 45 },
    { key: "TRAINING", data: 26 },
    { key: "STRIKE", data: 8 },
  ]);

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div style={{ marginLeft: isMobile ? 40 : 170 }}>
      <PieChart
        height={200}
        width={350}
        data={data}
        displayAllLabels={false}
        series={
          <PieArcSeries
            cornerRadius={54}
            padAngle={0.02}
            padRadius={5}
            doughnut={true}
            colorScheme={["#0088FE", "#1BA716", "orange", "red"]}
          />
        }
      />
    </div>
  );
}
