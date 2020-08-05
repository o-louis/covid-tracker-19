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
                        'black',
                        '#3CB371',
                        '#DC143C'
                    ],
                    hoverBackgroundColor: [
                        'black',
                        '#3CB371',
                        '#DC143C'
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
