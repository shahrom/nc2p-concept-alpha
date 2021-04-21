import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function CircularProgressWithLabel(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <CircularProgress
        variant="determinate"
        value={(props.value / props.max) * 100}
        size={70}
        style={{ color: props.color, padding: 0 }}
      />
      <p
        style={{
          color: props.color,
          fontSize: 20,
          marginTop: -50,
          padding: 0,
        }}
      >
        {props.value}
      </p>
      <p style={{ color: "gray", fontSize: 12, marginTop: 30 }}>
        {props.label}
      </p>
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
