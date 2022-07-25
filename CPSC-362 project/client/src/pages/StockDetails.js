import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
//import useStyles from './styles'
import { useState, useEffect } from 'react'
import { Typography, Container, Button } from '@material-ui/core'
import { fetchChart, fetchRecomendationData, fetchYHFAPI, getWatchList } from '../actions/object'
import StockInfo from '../Components/StockInfo/StockInfo'
import { useParams } from 'react-router-dom';
import Graph from '../Components/Graph/Graph'
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from '@mui/material/CircularProgress';
import { addToWatchList } from '../actions/object'

const StockDetails = () => {
    const { id } = useParams()
    const [msg, setMsg] = useState("")
    const [data, setData] = useState()
    const [recommendation, setRecommendation] = useState("None")
    const [chartData, setChartData] = useState()
    const [longName, setLongName] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [watchList, setWatchList] = useState([])
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        async function fetchData()
        {
          const d = await fetchYHFAPI(id)
          if(d.optionChain.result.length === 0)
          {
              setMsg("Not a valid ticker!")
          }  
          else
          {
            const r = await fetchRecomendationData(id)
            const c = await fetchChart(id)
            if(user)
            {
              const list = await getWatchList(user.result._id)
              setWatchList(list)
            }
            setData(d.optionChain.result[0])
            setLongName(d.optionChain.result[0].quote.shortName)
            //console.log(d.optionChain.result[0])  
            setChartData(c)
            if(r.finance.result.instrumentInfo)
            {
              if(r.finance.result.instrumentInfo.recommendation)
                setRecommendation(r.finance.result.instrumentInfo.recommendation.rating)
            }
            //console.log(r)
            
            setMsg("") // set error msg back to empty string
          }
          setIsLoading(false)
        }
        fetchData()
    }, [id])
    //console.log(data)
      const Icon = () => {
        if(watchList)
        {
          return watchList.find((symbol) => symbol === id)
          ? (
              <StarIcon/>
          ) : (
              <StarBorderIcon/>
          )
        }
      }

      const handleAdd = () => {
        addToWatchList({id: user.result._id, ticker: id})
        if(watchList.find((symbol) => symbol === id))
        {
          setWatchList(watchList.filter(symbol => symbol !== id))
        }
        else
        {
          setWatchList([...watchList, id])
        }
      }
  return (
    <div>
        <Navbar/>
        {isLoading ? <CircularProgress/> : (
        <Container maxWidth='sm' style={{marginTop: '30px'}}>
          {/* display invalid ticker */}
          {msg && <Typography color='secondary'>{msg}</Typography>}
          {/* display the name of the company */}
          <div style={{ display: "flex" }}>
            <Typography style={{ fontSize: "35px" }}>
              <b>{longName}</b>
            </Typography>
            { 
              (user && !msg) &&
              <Button size="small" onClick={handleAdd}>
                <Icon/>
              </Button>}
          </div>
          <div style={{marginTop: '10px'}}>
            <Typography variant='h6'><b>1 Month Chart</b></Typography><br/>
            <Graph data={chartData}/>
            {
              (data) &&
              <div style={{padding: '10px'}}>
                <StockInfo data={data}/>
                <Typography><b>Recommendation: </b>{recommendation}</Typography>
              </div>
            }
          </div>
        </Container>
        )}
        
    </div>
  )
}

export default StockDetails