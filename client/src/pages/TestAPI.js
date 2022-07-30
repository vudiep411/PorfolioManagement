import React from 'react'
import { useState, useEffect } from "react";
import Navbar from '../Components/Navbar/Navbar';
import { getNews } from '../actions/news';
import { Button } from '@material-ui/core';


// this is an API test class
const TestAPI = () => {
  return (
    <div>
        <Navbar/>
        <Button onClick={getNews}>Click</Button>
    </div>
  )
}

export default TestAPI