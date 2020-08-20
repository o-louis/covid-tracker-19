import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({countryData}) => {
    return (
        <Doughnut 
            data={{
                labels: [
                    'Confirmed',
                    'Recovered',
                    'Deaths'
                ],
                datasets: [{
                    data: countryData,
                    backgroundColor: [
                        '#EEE75C',
                        '#51D092',
                        'black'
                    ],
                    hoverBackgroundColor: [
                        '#EEE75C',
                        '#51D092',
                        'black'
                    ]
                }]
            }}
            options={{
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                },
            }}
        />
    )
}

export default DoughnutChart;
