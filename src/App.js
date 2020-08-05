import React, { useEffect, useState } from 'react';

import Card from "./components/Card";
import Select from "./components/Select";
import LineChart from './components/LineChart';
import DoughnutChart from './components/DoughnutChart';

import { convertDate } from "./utils/tools"
import CovidService from './services/CovidService';

const App = () => {
    const [datas, setDatas] = useState([]);
    const [options, setOptions] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [selected, setSelected] = useState('global');
    const [lastUpdate, setLastUpdate] = useState(null);
    const [isSendingRequest, setIsSendingRequest] = useState(false);

    useEffect(() => {
        CovidService.fetchGlobalData()
            .then(response => {
                const { confirmed, recovered, deaths, lastUpdate } = response;
                setDatas([
                    { confirmed: confirmed.value },
                    { recovered: recovered.value },
                    { deaths: deaths.value }
                ])
                setLastUpdate(convertDate(lastUpdate));
                setIsSendingRequest(true);
            }).catch(err => console.log(err));
    }, [isSendingRequest]);

    useEffect(()=> {
        CovidService.fetchDailyData()
            .then(response => {
                const values = response.map((country) => {
                    return [country.reportDate, country.totalConfirmed, country.deaths.total]
                });
                setDailyData(values);
            }).catch(err => console.log(err));
    }, [isSendingRequest]);

    useEffect(()=> {
        CovidService.fetchCountriesList()
            .then(response => {
                const nameCountries = response.countries.map((country) => {
                    return {value: country.name, label: country.name}
                });

                setOptions([
                    {value: "global", label: "Global"},
                    ...nameCountries
                ]);
            }).catch(err => console.log(err));
    }, [isSendingRequest]);

    const handleChange = () => {
        const value = document.getElementById("select-country").value;
        if (value !== "global") {
            CovidService.fetchCountryData(value)
                .then(response => {
                    const { confirmed, recovered, deaths } = response;
                    setCountryData([
                        confirmed.value,
                        recovered.value,
                        deaths.value
                    ])
                }).catch(err => console.log(err));
        }
        setSelected(value);
    };

    return (
        <div className="wrapper">
            <h1>COVID Tracker</h1>
            <h5>Wear a mask. Save lives.</h5>

            <div className="prevent-message">
                <div className="description">
                    <h3>People who know or think they might have COVID-19</h3>
                    <li className="symptoms">
                        If you are sick with COVID-19 or think you might have COVID-19, do not visit public areas. Stay home except to get medical care. As much as possible stay in a specific room and away from other people and pets in your home.
                    </li>
                    <li className="symptoms">
                        If you need to be around other people or animals, wear a mask (including in your home).
                        The mask helps prevent a person who is sick from spreading the virus to others. It helps keep respiratory droplets contained and from reaching other people.
                    </li>
                </div>
            </div>

            { isSendingRequest &&
                <div className="container">
                    <h3>Last updates: {lastUpdate}</h3>
                    <div className="cards-container">
                        <CardsList datas={datas} />
                    </div>
                    <Select selected={selected} options={options} handleChange={handleChange}/>
                    <Chart selected={selected} countryData={countryData} dailyData={dailyData} />
                </div>
            }
        </div>
    )
}

const Chart = ({selected, countryData, dailyData}) => (
    selected !== "global" ? <DoughnutChart countryData={countryData} /> : <LineChart dailyData={dailyData} />
)

const CardsList = ({datas}) => {
    return (
        datas.map((item, index) => {
            return <Card key={index} values={item} infected={datas[0].confirmed} />
        })
    )
}

export default App;
