/*
 * --------------------------------------------------------------------
 * Project: LCAD
 * Version: 0.1.1
 * File: MyAppbar.js
 * Created: Friday, 28th February 2020 11:37:36 am
 * Modified: Friday, 28th February 2020 11:37:36 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */
import React from "react";

// components
import BarChartView from "./components/BarChartView";
import ScatterChartView from "./components/ScatterChartView";
import PieChartView from "./components/PieChartView";
import Map from "./components/Map/Map";
import ViewState from "./ViewState";

export default function StatisticsView() {
  // 1
  const [monthlyData, setMonthlyData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [hotspot, setHotspot] = React.useState(false);
  // 2. ViewState
  const viewState = new ViewState();
  viewState.bindSetFilteredData = setFilteredData;
  viewState.bindSetMonthlyData = setMonthlyData;

  React.useEffect(() => {
    viewState.fetchData();
  }, []);

  const childrenSideBySideStyle = {
    display: "flex",
    flexDirection: "row",
    padding: "0px",
  };

  return (
    <div>
      {/* // Map */}
      <Map
        handleHotspot={() => setHotspot(!hotspot)}
        displayHotspot={hotspot}
        data={filteredData}
        width={window.innerWidth - 900}
        height={window.innerHeight - 300}
        marginLeft={0}
        marginTop={0}
      />

      {/* // Bar Chart */}
      <div
        style={{
          // background:
          //   "linear-gradient(to bottom, #2B364F 1%,rgba(0,0,0,0.8) 50%)",
          // backgroundColor: "rgba(0,0,0,0.3)",
          marginLeft: 0,
          marginTop: window.innerHeight - 300,
          width: window.innerWidth - 590,
          height: 250,
          position: "fixed",
          // backdropFilter: "blur(5px)",
        }}
      >
        <BarChartView
          // fetchData={monthlyData}
          data={filteredData}
          handleSliderChange={viewState.handleSliderChange}
        />
        <div />
      </div>

      {/* // Scatter Chart */}
      <div
        style={{
          // backgroundColor: "rgba(0,0,0,0.3)",
          width: 395,
          height: window.innerHeight - 270,
          right: 0,
          position: "fixed",
          marginTop: 0,
          backdropFilter: "blur(5px)",
        }}
      >
        <ScatterChartView data={filteredData} />
        <br />
        <PieChartView data={filteredData} />
        <div />
        <br />
        <div style={{ marginTop: -90, width: 300, marginLeft: 60 }}>
          <div style={childrenSideBySideStyle}>
            <div style={{ color: "white", fontSize: 13, marginLeft: "0px" }}>
              <p>A. SEKAMA</p>
              <p>B. TAMAN MENDU</p>
              <p>C. TAMAN RIDGEWAY</p>

              <p>D. TAMAN DAYA</p>
              <p>E. TABUAN HEIGHTS</p>
              <p>F. TABUAN JAYA</p>
            </div>
            <div style={{ color: "white", fontSize: 13, marginLeft: "40px" }}>
              <p>G. WESTWOOD</p>
              <p>H. HAPPY GARDEN</p>
              <p>I. TAMAN FLORA</p>

              <p>J. TAMAN BERJAYA</p>
              <p>K. TAMAN PUTIH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
