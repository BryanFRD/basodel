import React, { useState } from 'react';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(false);
  
  const handleRegister = () => {
    setUser(true);
  }
  
  const handleLogin = () => {
    setUser(true);
  }
  
  const handleLogout = () => {
    setUser(false);
  }
  
  return (<UserContext.Provider value={{user, handleRegister, handleLogin, handleLogout}}>{props.children}</UserContext.Provider>);
}

export default UserContextProvider;