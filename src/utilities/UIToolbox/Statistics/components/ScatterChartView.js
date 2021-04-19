import React from "react";
import {
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import Subheader from "material-ui/Subheader";

export default function ScatterPointChart(props) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    processData(props.data);
  }, [props.data]);

  const processData = (data) => {
    if (data == undefined) return;

    var data1 = [];
    for (var i = 1; i <= 31; i++) {
      for (var k = 0; k < data.length; k++) {
        var startDate = new Date("07/" + i + "/2018").getTime();
        var dataDate = new Date(data[k].DispatchDate).getTime();
        if (startDate == dataDate) {
          data1.push({
            type: data[k].IncidentTypeName,
            time: getDispatchHour(data[k].DispatchTime),
            day: i,
          });
        }
      }
    }

    setData(data1);
  };

  const getDispatchHour = (time) => {
    var d = new Date("July 21, 1983 " + time);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var hours = +(m / 60).toFixed(2);
    return h + hours;
  };

  return (
    <div style={{ marginTop: -50, marginBottom: 50 }}>
      <Subheader
        style={{
          marginTop: 10,
          marginLeft: 140,
          fontSize: 16,
          padding: 5,
          color: "gray",
          lineHeight: "20px",
        }}
      >
        DATE / TIME
      </Subheader>

      <ScatterChart
        width={350}
        height={250}
        margin={{ top: 20, right: 5, bottom: 0, left: 10 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis
          dataKey={"time"}
          type="number"
          unit=""
          ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24]}
        />
        <YAxis dataKey={"day"} type="number" unit="" domain={[1, "dataMax"]} />
        <Tooltip cursor={{ strokeDasharray: "10 10" }} />
        <Scatter data={data} fill="#8884d8">
          {data.map((entry, index) => {
            switch (entry.type) {
              case "VANDALISM":
                return <Cell key="CLAMPING" fill="#B200FF" />;
              case "WASTE":
                return <Cell key="COMPOUND" fill="green" />;
              case "POTHOLES":
                return <Cell key="OPERATION" fill="red" />;
            }
          })}
        </Scatter>
        <ReferenceLine x="12" stroke="red" label="AM PM" />
      </ScatterChart>
    </div>
  );
}
