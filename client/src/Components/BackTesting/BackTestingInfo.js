import React from 'react'
import { useState, useEffect } from 'react'
import * as backtest from './BackTestingCalculation'
import { fetchChart, fetchYHFAPI } from '../../actions/object'
import { Typography } from '@material-ui/core'

const BackTestingInfo = ({symbol}) => {

    const [data, setData] = useState(null)
    

    useEffect(() => {
        async function fetchData()
        {
            const Bdata1mo = await fetchChart(symbol, '1mo', '1d')
            setData(Bdata1mo.chart.result[0].indicators.quote[0])
        }
        fetchData()
    }, [])

    if(!data) return null

    const annualizedReturn5y = backtest.calculateAnnualReturn(data.close, 60).toFixed(2)
    const annualizedReturn1y = backtest.calculateAnnualReturn(data.close, 12).toFixed(2)
    const annualizedVolatility = backtest.calculateAnnualizedVolatility(data.close).toFixed(2)

    return (
    <div style={{marginTop: '55px'}}>
        <Typography><b>Annualized Return 5 year:</b> {annualizedReturn5y}%</Typography>
        <Typography><b>Annualized Return 1 year:</b> {annualizedReturn1y}%</Typography>
        <Typography><b>Annualized Volatility 1 year:</b> {annualizedVolatility}%</Typography>
    </div>
  )
}

export default BackTestingInfo