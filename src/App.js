import React, { useEffect, useState } from 'react';
import Card from "./components/Card";
import {fetchGlobalData} from './services/CovidService';

const App = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDatas(await fetchGlobalData());
            console.log(datas);
        }

        fetchAPI();
    }, []);

    return (
        <div className="wrapper">
            <h1>Tracker</h1>

            <div className="covid-values-container">
                <Card  />
                    {/* cards.map((item, index) => {
                        return (
                            <Card values={cards} key={index} />
                        )
                    }) */}
            </div>
        </div>
    )
}

export default App;
