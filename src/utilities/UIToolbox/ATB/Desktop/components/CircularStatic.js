import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function CircularProgressWithLabel(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100}
          size={100}
          style={{ color: "rgba(255,255,255,0.2)" }}
        />
      </Box>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={43}
          size={100}
          style={{ color: props.color, marginLeft: -100 }}
        />
        <p
          style={{
            color: props.color,
            fontSize: 30,
            marginLeft: -90,
            marginTop: 35,
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
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <CircularProgressWithLabel
      value={props.value}
      color={props.color}
      label={props.label}
      max={props.max}
    />
  );
}
