/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: ChartPie.js
 * Created: Tuesday, 30th March 2021 11:06:21 pm
 * Modified: Tuesday, 30th March 2021 11:07:52 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { PieChart, PieArcSeries } from "reaviz";

export default function ChartPie(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    var data = [
      { key: "RECEIVED", data: 22 },
      { key: "VERIFIED", data: 26 },
      { key: "PROCESSED", data: 45 },
      { key: "COMPLETED", data: 8 },
    ];

    setData([]);
    setTimeout(function () {
      setData(data);
    }, 200);
  }, [props.index]);

  return (
    <div>
      <PieChart
        height={300}
        width={450}
        data={data}
        displayAllLabels={false}
        series={
          <PieArcSeries
            doughnut={true}
            colorScheme={["#942B2C", "#1BA716", "orange", "#0088FE"]}
          />
        }
      />
    </div>
  );
}
