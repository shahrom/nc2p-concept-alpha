import React from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import PatrolTable from "./components/PatrolTable";
import MediaList from "./components/MediaList";
import Statistics from "./components/Statistics/Statistics";
import Map from "../MobileMap/Map";

export default function TaskingView(props) {
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSlideIndex(newValue);
  };

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div style={{ padding: "10px 10px" }}>
      <Tabs
        centered
        onChange={handleChange}
        value={slideIndex}
        style={{
          backgroundColor: "rgba(36,118,159,0.5)",
          height: 50,
          outline: "none",
        }}
        TabIndicatorProps={{
          style: {
            background: "#2396C8",
            borderRadius: 5,
            height: 2,
            top: 38,
          },
        }}
      >
        <Tab
          style={{ outline: "none" }}
          label={<p style={{ marginTop: 5, color: "white" }}>STATUS</p>}
          value={0}
        />
        <Tab
          style={{ outline: "none" }}
          label={<p style={{ marginTop: 5, color: "white" }}>REPORTS</p>}
          value={1}
        />
        <Tab
          style={{ outline: "none" }}
          label={<p style={{ marginTop: 5, color: "white" }}>LIST</p>}
          value={2}
        />
        {isMobile ? (
          <Tab
            style={{ outline: "none" }}
            label={<p style={{ marginTop: 5, color: "white" }}>MAP</p>}
            value={3}
          />
        ) : (
          <div />
        )}
      </Tabs>
      <SwipeableViews
        disabled // This will disable touch events
        className="SwipeableViews"
        index={slideIndex}
        onChangeIndex={handleChange}
      >
        <PatrolTable />
        <Statistics />
        <MediaList />
        <Map />
      </SwipeableViews>
    </div>
  );
}
