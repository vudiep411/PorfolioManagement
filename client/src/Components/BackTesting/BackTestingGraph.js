import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { fetchChart, fetchYHFAPI } from '../../actions/object'
import { border, borderColor } from '@mui/system'

const BackTestingGraph = ({symbol}) => {
    const [data, setData] = useState(null)
    const [data6m, setData6m] = useState(null)
    const [data1y, setData1y] = useState(null)

    useEffect(() => {
        async function fetchData()
        {
            const Bdata2y = await fetchChart(symbol, '2y', '1mo')
            const Bdata1m = await fetchChart(symbol, '6mo', '5d')
            const Bdata1y = await fetchChart(symbol, '1y', '5d')
            setData(Bdata2y.chart.result[0])
            setData6m(Bdata1m.chart.result[0])
            setData1y(Bdata1y.chart.result[0])
        }
        fetchData()
    }, [])
    if(!data) return null
    // console.log(data)
    const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber);
        return date.toLocaleString('en-US', {
          month: 'short',
        });
      }

    const time = data.timestamp.map(time => {
        const d = new Date(time*1000)
        return toMonthName(d.getMonth()) + " " + 
      d.getDate() + "/" + d.getFullYear()
      })

    const dataSet = data.indicators.quote[0].close

    const dataPlot = {
        labels: time,
        datasets: [
          {
            label: '2 years',
            data: dataSet,
            fill: false,
            borderColor: 'Blue',
          },
          {
            label: '1 year',
            data: data1y.indicators.quote[0].close,
            fil: false,
            borderColor: 'Green'
          },
          {
            label: '6 month',
            data: data6m.indicators.quote[0].close,
            fil: false,
            borderColor: 'Red'
          }
        ]
      };
  return (
    <Line data={dataPlot}/>
  )
}

export default BackTestingGraph