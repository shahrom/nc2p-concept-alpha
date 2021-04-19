/*
 * --------------------------------------------------------------------
 * Project:
 * Version: 0.1.1
 * File: DataService.js
 * Created: Wednesday, 11th November 2020 11:14:37 pm
 * Modified: Wednesday, 11th November 2020 11:18:17 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

export default class DataService {
  constructor() {
    this.monthlyData = [];
  }

  GetPotholes(callback) {
    fetch("data/Complaints/potholes.json")
      .then((result) => result.json())
      .then((data) => {
        callback(data);
      })
      .catch(function (err) {
        console.log("GetPotholes:" + err);
      });
  }

  GetVandalism(callback) {
    fetch("data/Complaints/vandalism.json")
      .then((result) => result.json())
      .then((data) => {
        callback(data);
      })
      .catch(function (err) {
        console.log("GetPotholes:" + err);
      });
  }

  GetWaste(callback) {
    fetch("data/Complaints/waste.json")
      .then((result) => result.json())
      .then((data) => {
        callback(data);
      })
      .catch(function (err) {
        console.log("GetPotholes:" + err);
      });
  }
}
