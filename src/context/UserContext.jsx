import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { DataManager } from '../helpers/DataManager.helper';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(false);
  
  useEffect(() => {
    const refreshUser = async () => {
      const userAccount = await DataManager.refreshToken();
      
      if(userAccount)
        setUser(userAccount);
    }
    
    refreshUser();
  }, []);

  const handleSignup = async (param) => {
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
    
    return false;
  }
  
  const handleLogin = async (param) => {
    if(param.remember)
      localStorage.setItem('rememberedUser', param.loginOrEmail);
    
    const model = {
      loginOrEmail: param.loginOrEmail,
      password: param.password
    }
      
    const {user, error} = await DataManager.auth(model);
    
    if(error)
      return 'error.login';
      
    setUser(user);
    return false;
  }
  
  const handleLogout = async (param) => {
    console.log('param:', param);
    
    setUser(false);
    Cookies.set('authToken', '');
    
    //TODO Redis ?
    return false;
  }
  
  const forgotPassword = async (param) => {
    console.log('param:', param);
  }
  
  return (<UserContext.Provider value={{user, handleSignup, handleLogin, handleLogout, forgotPassword}}>{props.children}</UserContext.Provider>);
}

export default UserContextProvider;