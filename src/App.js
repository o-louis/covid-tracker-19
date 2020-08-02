import React, { useEffect, useState } from 'react';

import Card from "./components/Card";
import LineChart from './components/LineChart';
import DoughnutChart from './components/DoughnutChart';

import CovidService from './services/CovidService';

const App = () => {
    const [datas, setDatas] = useState([]);
    const [country, setCountry] = useState([]);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState('');
    const [dailyData, setDailyData] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [isSendingRequest, setIsSendingRequest] = useState(false);

    // Get global data (confirmed, recovered and deaths)
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

    // Get daily data (dates, confirmed and deaths)
    useEffect(()=> {
        CovidService.fetchDailyData()
            .then(response => {
                const values = response.map((item) => {
                    return [item.reportDate, item.totalConfirmed, item.deaths.total]
                });
                setDailyData(values);
            }).catch(err => console.log(err));
    }, [isSendingRequest]);

    // Get countries name list
    useEffect(()=> {
        CovidService.fetchCountriesList()
            .then(response => {
                const { countries } = response;
                const nameCountries = countries.map((item) => {
                    return {value: item.name, label: item.name}
                });

                nameCountries.unshift({
                    value: "global", label: "Global"
                });

                setSelected("global");
                setOptions(nameCountries)
            }).catch(err => console.log(err));
    }, [isSendingRequest]);

    const handleChange = () => {
        const value = document.querySelector("#select-country").value;
        if (value !== "global") {
            
            CovidService.fetchCountry(value)
                .then(response => {
                    document.querySelector("option[value="+value+"]").selected = true;
            console.log(document.querySelector("option[value="+value+"]").selected);
                    setCountry([response.confirmed.value, response.recovered.value, response.deaths.value])
                })
        }
        setSelected(value);
    };

    const convertDate = (date) => {
        return new Date(date).toLocaleString('en-EN', {
            month: "long",
            day  : "numeric",
            year : "numeric"
        });
    };

    const CardsList = () => {
        return (
            datas.map((item, index) => {
                return <Card key={index} values={item} infected={datas[0].confirmed} />
            })
        )
    }

    const Select = () => {
        return (
            <select id="select-country" onChange={handleChange}>
                {
                    options.map((item, index) => {
                        return <option key={index} value={item.value}>{item.label}</option>
                    })
                }
            </select>
        )
    }

    const Chart = () => (
        selected !== "global" ? <DoughnutChart country={country} /> : <LineChart dailyData={dailyData} />
    )

    return (
        <div className="wrapper">
            <h1>COVID Tracker</h1>
            { isSendingRequest &&
                <div className="covid-values-container">
                    <h3>Last updates: {lastUpdate} </h3>
                    <CardsList />
                    <Select />
                    <Chart />
                </div>
            }
        </div>
    )
}

export default App;
