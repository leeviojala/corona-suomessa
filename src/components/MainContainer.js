import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button, Typography } from "@material-ui/core";
import Disclaimer from "./Disclaimer";
import Count from "./Count";
import Chart from "./Chart";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Container } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import moment from "moment";

export default function MainContainer() {
  const [selectedLocation, setSelectedLocation] = useState("HUS");
  const [infTotal, setInfTotal] = useState("");
  const [deadTotal, setDeadTotal] = useState("");
  const [coronaData, setCoronaData] = useState("");
  const location = [
    "Etelä-Karjala",
    "Etelä-Pohjanmaa",
    "Etelä-Savo",
    "HUS",
    "Itä-Savo",
    "Kainuu",
    "Kanta-Häme",
    "Keski-Pohjanmaa",
    "Keski-Suomi",
    "Kymenlaakso",
    "Lappi",
    "Pirkanmaa",
    "Pohjois-Karjala",
    "Pohjois-Pohjanmaa",
    "Pohjois-Savo",
    "Päijät-Häme",
    "Satakunta",
    "Vaasa",
    "Varsinais-Suomi",
  ];

  const handleChange = (event, values) => {
    console.log(values);
    setSelectedLocation(event.target.value);
    //console.log(selectedLocation);
    //loadData();
  };
  const loadData = async () => {
    const response = await axios.get(
      "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/v2"
    );
    setAllData(response);
  };

  const setAllData = (response) => {
    const unique = [
      ...new Set(
        response.data.confirmed.map((item) => {
          if (item.healthCareDistrict === selectedLocation) {
            return moment(item.date).format("DD.MM.YYYY");
          }
        })
      ),
    ];
    let displayData = [];
    unique.map((date) => {
      var infCounter = 0;
      var infTotal = 0;
      var deadCounter = 0;
      var deadTotal = 0;
      var recCounter = 0;

      //käydään läpi tartunnat valitussa sijainnissa
      response.data.confirmed.map((item) => {
        if (item.healthCareDistrict === selectedLocation) {
          infTotal = infTotal + 1;
          if (moment(item.date).format("DD.MM.YYYY") === date) {
            infCounter = infCounter + 1;
          }
        }
      });
      setInfTotal(infTotal);

      //käydään läpi kuolleet
      response.data.deaths.map((item) => {
        if (item.healthCareDistrict === selectedLocation) {
          deadTotal = deadTotal + 1;
          if (moment(item.date).format("DD.MM.YYYY") === date) {
            deadCounter = deadCounter + 1;
          }
        }
      });
      setDeadTotal(deadTotal);

      response.data.recovered.map((item) => {
        if (
          moment(item.date).format("DD.MM.YYYY") === date &&
          item.healthCareDistrict === selectedLocation
        ) {
          recCounter = recCounter + 1;
        }
      });

      displayData.push({
        date: date,
        infCount: infCounter,
        deadCount: deadCounter,
        recCount: recCounter,
      });
    });
    displayData = displayData.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setCoronaData(displayData);

    // setData(response.data);

    // var kuopioD = response.data.confirmed.filter(i => {
    //   return i.healthCareDistrict === selectedLocation;
    // });

    // kuopioD.forEach((e, i) => {
    //   e.count = i + 1;
    // });
    // var dCount = response.data.deaths.filter(i => {
    //   return i.healthCareDistrict === selectedLocation;
    // });
    // setKuopioData(kuopioD);
    // setCount(kuopioD.length);
    // setDeathCount(dCount.length);
    // console.log(kuopioData);
  };
  useEffect(() => {
    let mounted = true;

    loadData();

    return () => {
      mounted = false;
    };
  }, [selectedLocation]);

  if (!coronaData) {
    return <div>Loading data</div>;
  }

  return (
    <div>
      <Container>
        <Grid
          container
          spacing={3}
          justify="center"
          style={{ padding: "10px" }}
        >
          <Grid item xs={12}>
            <Disclaimer></Disclaimer>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="outlined-label">
                Valitse sairaanhoitopiiri
              </InputLabel>
              <Select
                labelId="outlined-label"
                id="outlined"
                label="Valitse sairaanhoitopiiri"
                value={selectedLocation}
                onChange={handleChange}
              >
                {location.map((l) => {
                  return <MenuItem value={l}>{l}</MenuItem>;
                })}
              </Select>
            </FormControl>
            {/* <Autocomplete
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
          /> */}
          </Grid>
          <Grid item xs={9} md={6}>
            <Count infTotal={infTotal} deadTotal={deadTotal}></Count>
          </Grid>
          <Grid item xs={12}>
            <Chart data={coronaData}></Chart>
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
      </Container>
    </div>
  );
}
