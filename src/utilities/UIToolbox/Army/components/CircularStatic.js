import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100}
          size={"5em"}
          style={{ color: "rgba(255,255,255,0.2)" }}
        />
      </Box>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={(props.value / props.max) * 100}
          size={"5em"}
          style={{ color: props.color, marginLeft: -80 }}
        />
        <p
          style={{
            color: props.color,
            fontSize: 30,
            marginLeft: -80,
            marginTop: 25,
            width: 80,
          }}
        >
          {props.value}
        </p>
      </Box>
      <p style={{ color: "white" }}>{props.label}</p>
    </div>
  );
}

export default function CircularStatic(props) {
  return (
    <CircularProgressWithLabel
      value={props.value}
      color={props.color}
      label={props.label}
      max={props.max}
    />
  );
}
