import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth_DSP } from '../AuthContext';

import DateTime from './utility/dateTime';

//Fronend
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import CustomInput from "./frontend/CustomInput";

//External CSS
import '../App.css'

function DSPLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const{login} = useAuth_DSP()

  const handleLogin = () => {
    if (login(username, password)) {
        navigate('/DSPMain');
    } else {
      alert('Invalid username or password!');
    }
  };


  const handleChange_un = (e) =>{

    setUsername(e.target.value)
    
  }

  const handleChange_pwd = (e) =>{

    setPassword(e.target.value)
    
  }

  return (
    // <div>
    //   <h1>DSP Login </h1>
    //   <input
    //     type="text"
    //     placeholder="Username"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={handleLogin}>Login</button>
    // </div>


    <div className='APP-OUTER'>   
      <div className='APP-MIDDLE'>       
        <div className='APP-COTNER'>

            <div className='App-Header'>
              <h1>Driver Monitor</h1>
            </div>

            <div className='App-Time'>
              <DateTime></DateTime>
            </div>

            <div className='App-Login'>

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

        </div>
      </div>
    </div>
  );
}

export default DSPLoginPage;
