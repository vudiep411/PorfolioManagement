import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'


const Graph = ({ data }) => {

    if(!data) return null

    const time = data.chart.result[0].timestamp
    
    //convert timestamp to string
    const toMonthName = (monthNumber) => {
      const date = new Date();
      date.setMonth(monthNumber - 1);
      return date.toLocaleString('en-US', {
        month: 'long',
      });
    }

    if(!time) return null
    
    const labels = time.map(time => {
      const d = new Date(time*1000)
      return toMonthName(d.getMonth()) + " " + 
      d.getDate()
    })

    const symbol = data.chart.result[0].meta.symbol
    const dataSet = data.chart.result[0].indicators.quote[0].close
    
    const color = dataSet[0] < dataSet[dataSet.length - 1] ? 'Green' : 'Red'

    const dataPlot = {
        labels: labels,
        datasets: [
          {
            label: symbol,
            data: dataSet,
            fill: false,
            borderColor: color,
          },
        ]
      };

  return (
    <div>
        <Line data={dataPlot}/>
    </div>
  )
}

export default Graph