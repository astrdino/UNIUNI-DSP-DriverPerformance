import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth_DSP } from '../AuthContext';

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

  return (
    <div>
      <h1>DSP Login </h1>
      <input
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default DSPLoginPage;
