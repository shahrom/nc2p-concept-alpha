import React, { useState, useEffect } from "react";
import { PieChart, PieArcSeries } from "reaviz";

export function ChartPie1() {
  const [data, setData] = useState([
    { key: "A", data: 21 },
    { key: "B", data: 34 },
    { key: "C", data: 17 },
    { key: "D", data: 30 },
    { key: "E", data: 21 },
    { key: "F", data: 27 },
  ]);

  useEffect(() => {
    iInterval();
  }, []);

  const iInterval = () => {
    var myVar = setInterval(myTimer, 3000);

    function myTimer() {
      setData([
        { key: "A", data: randomInteger(10, 50) },
        { key: "B", data: 34 },
        { key: "C", data: randomInteger(20, 50) },
        { key: "D", data: 30 },
        { key: "E", data: randomInteger(10, 50) },
        { key: "F", data: 27 },
      ]);
    }
  };

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <PieChart
        height={190}
        width={190}
        data={data}
        displayAllLabels={false}
        series={
          <PieArcSeries
            doughnut={true}
            colorScheme={[
              "orange",
              "cyan",
              "green",
              "blue",
              "purple",
              "magenta",
            ]}
          />
        }
      />
    </div>
  );
}
