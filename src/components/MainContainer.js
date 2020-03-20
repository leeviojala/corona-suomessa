import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button, Typography } from "@material-ui/core";
import Disclaimer from "./Disclaimer";
import Count from "./Count";
import Chart from "./Chart";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useStateWithCallback from "use-state-with-callback";

export default function MainContainer() {
  const [data, setData] = useState(null);
  const [kuopioData, setKuopioData] = useState(null);
  const [count, setCount] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const location = [
    "Etelä-Karjala",
    "Etelä-Pohjanmaa",
    "Etelä-Savo",
    "HUS",
    "Pirkanmaa"
  ];

  const handleChange = (event, values) => {
    console.log(values);
    setSelectedLocation(values);
    //console.log(selectedLocation);
    //loadData();
  };
  const loadData = async () => {
    const response = await axios.get(
      "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData"
    );
    setAllData(response);
  };

  const setAllData = response => {
    console.log("dfdfd");
    setData(response.data);

    var kuopioD = response.data.confirmed.filter(i => {
      return i.healthCareDistrict === selectedLocation;
    });

    kuopioD.forEach((e, i) => {
      e.count = i + 1;
    });

    setKuopioData(kuopioD);
    setCount(kuopioD.length);
    console.log(kuopioData);
  };
  useEffect(() => {
    let mounted = true;

    loadData();

    return () => {
      mounted = false;
    };
  }, [selectedLocation]);

  if (!data) {
    return <div>Loading data</div>;
  }

  return (
    <div>
      <Grid container spacing={3} justify="center" style={{ padding: "10px" }}>
        <Grid item xs={12}>
          <Disclaimer></Disclaimer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={location}
            getOptionLabel={option => option}
            fullWidth
            onChange={handleChange}
            renderInput={params => (
              <TextField
                {...params}
                label="Valitse Sairaanhoitopiiri"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={9} md={6}>
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
