import React, { useEffect, useState } from 'react'
import { getNews } from '../../actions/news'
import Carousel from "better-react-carousel";
import {  Grid, Paper } from '@material-ui/core';


const News = () => {
    const [newsData, setNewsData] = useState()

    useEffect(() => {
        async function fetchNews()
        {
            const news = await getNews()
            setNewsData(news.stories)
        }
        fetchNews()
    }, [])

    if(!newsData) return null

  return (
    <div>
        <Carousel cols={2} rows={2} gap={1} loop>
            {newsData.map((item, i) => {
                return(
                    <Carousel.Item key={i}>
                        <Grid container>
                            <Paper style={{padding: '5px'}}>
                                <Grid item xs={6}>
                                    <img src={item.thumbnailImage} alt='' style={{height: '200px', marginRight: '10px'}}></img>
                                </Grid>
                                <Grid item xs={6} style={{maxWidth: '400px', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                    <a 
                                    style={{
                                        fontSize: '20px', 
                                        textDecoration: 'none', 
                                        color: 'Black',
                                        }} href={item.longURL}>
                                        {item.title}
                                    </a>
                                </Grid>
                            </Paper>
                        </Grid>
                        
                    </Carousel.Item>    
                )
            })}
        </Carousel>

    </div>
  )
}

export default News