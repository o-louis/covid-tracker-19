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
                    borderColor: '#3CB371',
                    fill: true,
                }, {
                    data: dailyData.map((item) => item[2]),
                    label: 'Deaths',
                    borderColor: '#DC143C',
                    fill: true,
                }]
            }}
            className="line-chart"
        />
    )
}

export default LineChart;
