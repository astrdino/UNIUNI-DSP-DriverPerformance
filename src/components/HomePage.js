import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DateTime from './utility/dateTime';

const HomePage = () => {

  const [selectedDSP, setSelectedDSP] = useState('');

  const handleChange = (event) => {
    setSelectedDSP(event.target.value);
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
        <option value="componentA">Component A</option>
        <option value="componentB">Component B</option>
        {/* Add more options as needed */}
      </select>
      
      {/* {selectedOption === 'componentA' && <ComponentA />}
      {selectedOption === 'componentB' && <ComponentB />} */}
      
      </div>
        
      </main>
    </div>
  );
}

export default HomePage;