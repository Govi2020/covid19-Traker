import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@material-ui/core';
import InfoBox from './Components/InfoBox';
import LineGraph from './Components/LineGraph';
import Table from './Components/Table';
import { sortData } from './util.js';
import './style.css';

export default function App() {
  const [countries, setContries] = useState([
    'WorldWide',
    'India',
    'USA',
    'London'
  ]);
  const [country, setCountry] = useState('worldWide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const onChangeCountry = async e => {
    const countryCode = e.target.value;
    // console.log(countryCode);
    setCountry(countryCode);
    let url =
      countryCode == 'worldWide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCountryInfo(data);
        // console.log(data);
      });
  };

  useEffect(() => {
    const getCountries = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => {
          return res.json();
        })
        .then(data => {
          const countries = data.map(item => {
            return {
              name: item.country,
              value: item.countryInfo.iso2
            };
          });
          let sortedData = sortData(data);
          setTableData(sortedData);
          setContries(countries);
        });
    };
    return getCountries();
  }, []);
  useEffect(async () => {
    console.log('hello');
    await fetch('https://disease.sh/v3/covid-19/all')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCountryInfo(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="app">
      <section className="left-section">
        {/* Header */}
        <div className="header">
          {/* Title */}
          <h1>Covid Tracker</h1>
          <FormControl className="drop-down">
            <Select
              variant="outlined"
              value={country}
              onChange={onChangeCountry}
            >
              <MenuItem value="worldWide">WorldWide</MenuItem>
              {countries.map(item => {
                return <MenuItem value={item.value}>{item.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo?.todayCases}
            total={countryInfo?.cases}
            key="Coronavirus Cases"
          />

          <InfoBox
            title="Recovered"
            cases={countryInfo?.todayCases}
            total={countryInfo?.recovered}
            key="Recovered"
          />

          <InfoBox
            title="Deaths"
            cases={countryInfo?.todayDeaths}
            total={countryInfo?.deaths}
            key="Deaths"
          />
        </div>
      </section>
      <Card className="right-section">
        <CardContent>
          <h2>Live cases by country</h2>
          {/* Table */}
          <Table countries={tableData} />
          {/* Graph */}
          <h2>World Wide Cases</h2>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}
