/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: ContentView.ViewState.js
 * Created: Saturday, 7th November 2020 8:49:41 am
 * Modified: Saturday, 7th November 2020 9:52:39 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

import DataService from "./components/DataService";
import { createContext } from "react";
export const StateBinder = createContext(null);

let instance = null;

export default class ViewState {
  constructor() {
    if (!instance) {
      this.monthlyData = [];
      this.setMonthlyData = null;
      this.setFilteredData = null;
      window.MessageDispatcher.SubscribeDispatcher(
        "Statistics",
        this.handleDispatchMessage
      );
      this.dataService = new DataService();
      instance = this;
    }
    return instance;
  }

  handleDispatchMessage = (param) => {
    var self = this;
    if (param.Receiver === "STATISTICS") {
      switch (param.Command) {
        case "SET_CONTENT":
          if (param.Data === "POTHOLES") {
            return this.dataService.GetPotholes((data) => {
              this.setMonthlyData(data);
              this.setFilteredData(data);
              this.monthlyData = data;
            });
          }

          if (param.Data === "WASTE") {
            return this.dataService.GetWaste((data) => {
              this.setMonthlyData(data);
              this.setFilteredData(data);
              this.monthlyData = data;
            });
          }

          if (param.Data === "VANDALISM") {
            return this.dataService.GetVandalism((data) => {
              this.setMonthlyData(data);
              this.setFilteredData(data);
              this.monthlyData = data;
            });
          }

          break;
        default:
          break;
      }
    }
  };

  // Bind useState =============================
  set bindSetMonthlyData(state) {
    this.setMonthlyData = state;
  }
  set bindSetFilteredData(state) {
    this.setFilteredData = state;
  }
  // ===========================================

  fetchData() {
    return this.dataService.GetPotholes((data) => {
      this.setMonthlyData(data);
      this.setFilteredData(data);
      this.monthlyData = data;
    });
  }

  handleSliderChange = async (val) => {
    var start = val.startIndex + 1;
    var end = val.endIndex + 1;
    if (val != undefined) {
      if (val.startIndex > 0 || val.endIndex > 0) {
        await this.setFilteredData(this.filterData(start, end));
      }
    }
  };

  filterData(startDate, endDate) {
    var data = [];
    data = this.monthlyData;

    if (data != null) {
      var startDate = new Date("07/" + startDate + "/2018").getTime();
      var endDate = new Date("07/" + endDate + "/2018").getTime();

      var result = this.monthlyData.filter(function (item) {
        var itemTime = new Date(item.DispatchDate).getTime();
        return itemTime >= startDate && itemTime <= endDate;
      });

      return result;
    } else {
      return [];
    }
  }
}
