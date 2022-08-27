import React, { useState } from 'react';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(false);
  
  const handleSignup = async (param) => {
    console.log('param:', param);
    setUser(true);
    
    //TODO return error or false
    return true;
  }
  
  const handleLogin = async (param) => {
    console.log('param:', param);
    setUser(true);
    
    //TODO return error or false
    return true;
  }
  
  const handleLogout = async (param) => {
    console.log('param:', param);
    setUser(false);
    
    //TODO return error or false
    return true;
  }
  
  const forgotPassword = async (param) => {
    console.log('param:', param);
  }
  
  return (<UserContext.Provider value={{user, handleSignup, handleLogin, handleLogout, forgotPassword}}>{props.children}</UserContext.Provider>);
}

export default UserContextProvider;