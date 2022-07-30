// @param
// data -> type: [], array of 1 month closing prices daily 
// noOfmonths -> number of months for annualized return 
export const calculateAnnualReturn = (data, noOfMonths) => {
    const quote = data
    const overallReturn  = (quote[quote.length - 1] - quote[0]) / quote[0]
    return (((1 + overallReturn) ** noOfMonths) - 1)
}


// @param
// data -> type: [], array of 1 month closing prices daily 
export const calculateAnnualizedVolatility = (data) => {
    let avgReturn = 0.0
    let variance = 0.0
    const dailyChangePercent = []
    for(let i = 1; i < data.length; i++)
    {
        const val = (data[i] - data[i - 1]) / data[i - 1]
        avgReturn += val
        dailyChangePercent.push(val.toFixed(2))
    }
    avgReturn /= data.length
    
    for(let i = 0; i < dailyChangePercent.length; i++)
    {
        variance += (dailyChangePercent[i] - avgReturn) ** 2
    }
    variance /= data.length - 1

    return Math.sqrt(variance) * 100 * Math.sqrt(252)
}

