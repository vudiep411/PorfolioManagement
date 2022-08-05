import React from 'react'
import Home from './pages/Home'
import StockDetails from './pages/StockDetails';
import Login from './pages/Login'
import TestAPI from './pages/TestAPI';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
           <Route exact path="/" element={<Home/>}/>
           <Route exact path="/quote/:id" element={<StockDetails/>}/>
           <Route exact path= "/login" element={<Login/>}/>
           <Route exact path= "/testapi" element={<TestAPI/>}/>
         </Routes> 
     </Router>
    </div>
  );
}

export default App;
