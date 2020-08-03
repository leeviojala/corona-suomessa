import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";
import { Typography } from "@material-ui/core";

export default function Chart(props) {
  return (
    <React.Fragment>
      <Typography variant="h5">Sairastuneiden määrä päivittäin</Typography>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={props.data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" allowDuplicatedCategory={false}></XAxis>
            <YAxis allowDecimals={false}>
              <LabelList
                value="Pages of my website"
                offset={0}
                position="top"
              />
            </YAxis>

            <Tooltip label="asd"></Tooltip>
            <Area
              type="monotone"
              dataKey="infCount"
              stroke="#8884d8"
              fill="#8884d8"
              name="sairastuneet"
            ></Area>
            <Area
              type="monotone"
              dataKey="deadCount"
              stroke="#fffff"
              fill="#fffff"
              name="kuolleet"
            />
            <Tooltip></Tooltip>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
}
