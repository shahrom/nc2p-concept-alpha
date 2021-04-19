export default class DetectionScenarioData {
  getPoints() {
    return [
      {
        type: "Feature",
        properties: {
          title: "CCTV ALERT",
          class: "cctv_blink",
        },
        geometry: {
          type: "Point",
          coordinates: [110.351391, 1.557934],
        },
      },
    ];
  }
}
