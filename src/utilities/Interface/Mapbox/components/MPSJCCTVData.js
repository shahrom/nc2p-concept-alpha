/*
 * --------------------------------------------------------------------
 * Project: LCAD
 * Version: 0.1.1
 * File: CCTVData copy.js
 * Created: Tuesday, 10th March 2020 9:10:17 pm
 * Modified: Tuesday, 10th March 2020 9:10:17 pm
 * Author: Shahrom Azmi Nazeer (shahrom@scs.my)
 *
 * Copyright (C) 2020 - System Consultancy Services Sdn. Bhd.
 * --------------------------------------------------------------------
 */

export default class MPSJCCTVData {
  getCCTVData() {
    return [
      {
        type: "Feature",
        properties: { title: "CCTV 1", class: "cctv" },
        geometry: { type: "Point", coordinates: [101.59070555707859, 3.076036717200984] }
      },
      {
        type: "Feature",
        properties: { title: "CCTV 2", class: "cctv" },
        geometry: { type: "Point", coordinates: [101.58922497770237, 3.0783615176833585] }
      },
      {
        type: "Feature",
        properties: { title: "CCTV 3", class: "cctv" },
        geometry: { type: "Point", coordinates: [101.5879697038834, 3.073561924020506] }
      },
      {
        type: "Feature",
        properties: { title: "CCTV 4", class: "cctv" },
        geometry: { type: "Point", coordinates: [101.5879697038834, 3.0741940145995788] }
      },
      {
        type: "Feature",
        properties: { title: "CCTV 5", class: "cctv" },
        geometry: { type: "Point", coordinates: [101.58634964963841, 3.0736690580433073] }
      }
    ];
  }
}
