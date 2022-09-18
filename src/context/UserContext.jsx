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

  /**
   * 
   * @param {*} param {email, login, password, user_account: {username}}
   * @returns false or error
   */
  const handleSignup = async (param) => {
    const model ={
      email: param.email,
      login: param.login,
      password: param.password,
      user_account: {
        username: param.username
      }
    }
      
    return await DataManager.create('usercredential', model)
      .then(value => {
        console.log('value:', value);
        return false;
      }, error => {
        console.log('error:', error);
        return true;
      })
  }
  
  /**
   * 
   * @param {*} param {loginOrEmail, password}
   * @returns false or error
   */
  const handleLogin = async (param) => {
    if(param.remember)
      localStorage.setItem('rememberedUser', param.loginOrEmail);
    
    const model = {
      email: param.loginOrEmail,
      login: param.loginOrEmail,
      password: param.password
    }
      
    const {UserAccount, error} = await DataManager.auth(model);
    
    if(error)
      return error;
      
    setUser(UserAccount);
    return false;
  }
  
  /**
   * 
   * @returns false or error
   */
  const handleLogout = async () => {
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