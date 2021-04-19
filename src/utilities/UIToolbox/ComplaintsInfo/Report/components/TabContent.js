import React from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// components
import Status from "./Status/Status";
import ComplaintList from "./ComplaintList";

export default function ReportContent(props) {
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSlideIndex(newValue);
  };

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
            height: 5,
            top: 38,
          },
        }}
      >
        <Tab
          style={{ minWidth: 120, outline: "none" }}
          label={<p style={{ marginTop: 5, color: "white" }}>STATUS</p>}
          value={0}
        />
        <Tab
          style={{ minWidth: 120, outline: "none" }}
          label={<p style={{ marginTop: 5, color: "white" }}>LIST</p>}
          value={1}
        />
      </Tabs>
      <SwipeableViews
        className="SwipeableViews"
        index={slideIndex}
        onChangeIndex={handleChange}
        style={{ height: props.height - 400 }}
      >
        <div>
          <Status />
        </div>
        <div>
          <ComplaintList />
        </div>
      </SwipeableViews>
    </div>
  );
}
