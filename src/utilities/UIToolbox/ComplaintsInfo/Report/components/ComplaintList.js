/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: AktaList.js
 * Created: Friday, 26th March 2021 11:04:55 am
 * Modified: Friday, 26th March 2021 11:12:12 am
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2021 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import React from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import Button from "@material-ui/core/Button";

export default class AktaList extends React.Component {
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: true,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    drawerStateApprehension: false,
  };

  handleSelectItem = (item) => {
    var param = {
      Receiver: "STATISTICS",
      Command: "SET_CONTENT",
      Data: item,
    };
    window.MessageDispatcher.TriggerMessageDispatcher(param);
  };

  render() {
    const tableData = [
      {
        act: "POTHOLES",
        case: "321",
        region: "KEPONG, SEGAMBUT, CHERAS",
      },
      {
        act: "WASTE",
        case: "59",
        region: "SEPUTEH, SETIAWANGSA",
      },
      {
        act: "WILD DOGS",
        case: "17",
        region: "CHERAS, KEPONG, SEGAMBUT",
      },
      {
        act: "DAMAGES",
        case: "15",
        region: "SETIAWANGSA, BATU, CHERAS",
      },
      {
        act: "VANDALISM",
        case: "14",
        region: "CHERAS, SEPUTEH, BATU",
      },
      {
        act: "LIGHTING",
        case: "7",
        region: "SEGAMBUT, SEPUTEH",
      },
      {
        act: "OTHERS",
        case: "6",
        region: "BATU, SETIAWANGSA",
      },
      {
        act: "PLAY GROUNDS",
        case: "4",
        region: "SEPUTEH, SETIAWANGSA, BATU",
      },
      {
        act: "ENFORCEMENT",
        case: "3",
        region: "BATU, CHERAS",
      },
      {
        act: "MAINTENANCE",
        case: "2",
        region: "BATU, SETIAWANGSA, BATU, CHERAS",
      },
    ];

    const tableStyle = {
      backgroundColor: "rgba(0,0,0,0)",
      padding: 0,
      marginTop: 0,
    };

    const col4Style = {
      color: "#ff4c4c",
      fontSize: "16px",
      width: "50px",
      fontWeight: "bold",
      padding: "0px",
    };

    const col2Style = {
      color: "orange",
      fontSize: "14px",
      width: "220px",
    };

    const col1Style = {
      color: "gray",
      fontSize: "14px",
      width: "5px",
    };

    return (
      <div style={{ padding: 10 }}>
        <Table style={tableStyle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: "5px" }}>#</TableHeaderColumn>
              <TableHeaderColumn style={{ width: "220px" }}>TYPE</TableHeaderColumn>
              <TableHeaderColumn style={{ width: "50px", padding: "0px" }}>
                TOTAL
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover={false}>
            {tableData.map((row, index) => (
              <TableRow
                key={index}
                selectable={true}
                displayBorder={false}
                selected={false}
              >
                <TableRowColumn style={col1Style}>{index + 1}</TableRowColumn>
                <TableRowColumn style={col2Style}>
                  <Button
                    onClick={() => this.handleSelectItem(row.act)}
                    style={{
                      outline: "none",
                      textAlign: "left",
                      color: "yellow",
                      justifyContent: "flex-start",
                    }}
                  >
                    {row.act}
                  </Button>
                </TableRowColumn>
                <TableRowColumn style={col4Style}>{row.case}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
