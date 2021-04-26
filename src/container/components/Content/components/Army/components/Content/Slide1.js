/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: LeftDrawer.js
 * Created: Wednesday, 4th November 2020 2:08:25 pm
 * Modified: Thursday, 5th November 2020 1:32:22 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import { FitToViewport } from "react-fit-to-viewport";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import MobileContent from "utilities/Interface/Army/Mobile/Summary";
import DesktopContent from "utilities/Interface/Army/Desktop/Summary";

export default function Slide1(props) {
  // MediaQuery
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleUpdateData = () => {
    window.ViewStateManager.UpdateDisplayData();
  };

  return (
    <div
      onClick={() => handleUpdateData()}
      style={{
        backgroundColor: "rgba(17,21,30,0.5)",
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 20,
            color: "white",
            backgroundColor: "#0B3B84",
          }}
        >
          SUMMARY
        </p>

        {isMobile ? (
          <MobileContent
            updateData={props.updateData}
            sliderIndex={props.sliderIndex}
          />
        ) : (
          <Grid container justify={"center"}>
            <FitToViewport
              width={1100}
              height={700}
              minZoom={0.6}
              maxZoom={1}
              style={{ overflow: "hidden" }}
            >
              <Grid container justify={"center"}>
                <DesktopContent
                  updateData={props.updateData}
                  sliderIndex={props.sliderIndex}
                />
              </Grid>
            </FitToViewport>
          </Grid>
        )}
      </div>
    </div>
  );
}
