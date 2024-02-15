

// NOT USING 02/14/2024



import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext("");

export function useAuth_DSP() {
  return useContext(AuthContext);
}

export const AuthProvider_DSP = ({ children }) => {
  const [user, setUser] = useState(null);

  const login_DSP = (username, password) => {
    if (username === 'DSP' && password === 'DSP') {
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
    login_DSP,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
