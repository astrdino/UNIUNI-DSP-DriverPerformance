import React, { Component, useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

import * as XLSX from 'xlsx';
import DateTime from './utility/dateTime';
import FetchData from './utility/fetchData';

const HomePage = () => {

  const [selectedDSP, setSelectedDSP] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const path = event.target.value;
    setSelectedDSP(path);

    // Navigate to the selected component's route
    navigate(path);
  };



 

  return (
    <div>
      <header>
        <h1>Driver Performance Monitor</h1>
      </header>
      <main>
      <Link to="/login">Login as Admin</Link> 
      <Link to="/DSPLogin">Login as DSP</Link> 
      <DateTime></DateTime>
      


      <div>
      <select onChange={handleChange} value={selectedDSP}>
        <option value="">Select a Component</option>
        <option value="/DSPMain">DSP @ 1</option>
        <option value="/DSPMain">DSP @ 2</option>
        
      
      </select>
      
  
      </div>
        
      </main>
    </div>
  );
}

export default HomePage;