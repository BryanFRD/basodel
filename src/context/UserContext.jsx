import React, { useState, useEffect } from 'react';
import { DataManager } from '../helpers/DataManager.helper';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(false);
  
  useEffect(() => {
    
  }, []);
  
  const handleSignup = async (param) => {
    if(param.password === param.confirmPassword){
      if(!param.acceptCGU)
        return 'error.acceptCGU';
      
      const model =
      {
        model: {
          email: param.email,
          login: param.login,
          password: param.password,
          user_account: {
            username: param.username
          }
        }
      }
      
      const user = await DataManager.create('usercredential', model);
      
      if(!user)
        return 'error.signup';
    } else {
      return 'error.samePassword';
    }
    
    return false;
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