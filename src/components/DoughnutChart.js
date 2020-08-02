import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({country}) => {
    return (
        <Doughnut 
            data={{
                labels: [
                    'Confirmed',
                    'Recovered',
                    'Deaths'
                ],
                datasets: [{
                    data: country,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }}
        />
    )
}

export default DoughnutChart;
