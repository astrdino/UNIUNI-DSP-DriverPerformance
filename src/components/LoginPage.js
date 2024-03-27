
//admin login page


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import DateTime from './utility/dateTime';

//Frontend
import CustomInput from "./frontend/CustomInput";
import Button from "./frontend/Button";
import Alert from '@mui/material/Alert';

//External CSS
import '../App.css'


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const{login} = useAuth()



  const handleChange_un = (e) =>{

    setUsername(e.target.value)
    
  }

  const handleChange_pwd = (e) =>{

    setPassword(e.target.value)
    
  }

  // handleChange = e => {
  //   // this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  // };

  
  const handleLogin = () => {
    if (login(username, password)) {
        navigate('/dashboard');
    } else {
      alert('Invalid username or password!');
      <Alert severity="error">This is an error Alert.</Alert>
    }
  };




  return (

    <div className='APP-OUTER'>   
      <div className='APP-MIDDLE'>
        <div className='APP-COTNER'>
      <div className='App-Header'>

        <h1>Driver Monitor</h1> 

      </div>

      <div className='APP-Time'>
        <DateTime></DateTime>
      </div>
      
      

      <div className='Admin-Login'>

        <form className="form">
          <CustomInput
            labelText="Username"
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={handleChange_un}
            type="text"
          />
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={handleChange_pwd}
            type="password"
          />

          <Button type="button" color="primary" className="form__custom-button" onClick={handleLogin}>
            Log in
          </Button>
        </form>

      </div>

      




        {/* <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button> */}

        </div>
      </div>
     </div>
  );
}

export default LoginPage;
