import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuth_DSP() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  //Admin
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === '' && password === '') {
      setUser({ username });
      return true;
    }
    else if(username === 'DSP' && password === 'DSP'){
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };


  //DSP

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



