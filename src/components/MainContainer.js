import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button, Typography } from "@material-ui/core";
import Disclaimer from "./Disclaimer";
import Count from "./Count";
import Chart from "./Chart";

export default function MainContainer() {
  const [data, setData] = useState(null);
  const [kuopioData, setKuopioData] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const response = await axios.get(
        "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData"
      );
      if (mounted) {
        setData(response.data);

        var kuopioD = response.data.confirmed.filter(i => {
          return i.healthCareDistrict === "Pohjois-Savo";
        });

        kuopioD.forEach((e, i) => {
          e.count = i;
        });

        setKuopioData(kuopioD);
        setCount(kuopioD.length);
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  });

  if (!data) {
    return <div>Loading data</div>;
  }

  return (
    <div>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Disclaimer></Disclaimer>
        </Grid>
        <Grid item xs={9}>
          <Count count={count}></Count>
        </Grid>
        <Grid item xs={12}>
          <Chart data={kuopioData}></Chart>
        </Grid>
        <Grid item xs={12}>
          <Typography>©Leevi Ojala</Typography>
          <Button
            variant="contained"
            href="https://github.com/leeviojala/corona-pohjois-savo"
          >
            Github
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
