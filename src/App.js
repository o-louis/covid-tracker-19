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
    const [globalData, setGlobalData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [selected, setSelected] = useState('global');
    const [lastUpdate, setLastUpdate] = useState(null);
    const [isSendingRequest, setIsSendingRequest] = useState(false);

    useEffect(() => {
        CovidService.fetchGlobalData()
            .then(response => {
                const { confirmed, recovered, deaths, lastUpdate } = response;
                const global = [
                    { confirmed: confirmed.value },
                    { recovered: recovered.value },
                    { deaths: deaths.value }
                ]
                setDatas(global);
                setGlobalData(global);
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

                    setDatas([
                            { confirmed: confirmed.value },
                            { recovered: recovered.value },
                            { deaths: deaths.value }
                    ]);
                }).catch(err => console.log(err));
        } else {
            setDatas(globalData);
        }
        setSelected(value);
    };

    return (
        <div className="wrapper">
            <h1>COVID Tracker</h1>
            <h5>Wear a mask. Save lives.</h5>

            { isSendingRequest &&
                <div className="container">
                    <h3>Last updates: {lastUpdate}</h3>
                    <div className="cards-container">
                        <CardsList datas={datas}/>
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
