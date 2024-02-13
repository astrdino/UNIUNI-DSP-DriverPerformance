import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>My Simple React Home Page</h1>
      </header>
      <main>
      <Link to="/login">Login</Link> 
        
      </main>
    </div>
  );
}

export default HomePage;