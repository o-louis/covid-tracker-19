import React from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = ({dailyData}) => {
    return (
        <Line
            data={{
                labels: dailyData.map((item) => item[0]),
                datasets: [{
                    data: dailyData.map((item) => item[1]),
                    label: 'Infected',
                    borderColor: 'green',
                    fill: true,
                }, {
                    data: dailyData.map((item) => item[2]),
                    label: 'Deaths',
                    borderColor: 'red',
                    fill: true,
                }]
            }}
        />
    )
}

export default LineChart;
