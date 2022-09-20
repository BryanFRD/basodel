import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { DataManager } from '../helpers/DataManager.helper';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const { t } = useTranslation();
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
   * @param {{email, login, password, user_account: {username}}} param
   * @returns {(boolean|string)} false or error
   */
  const handleSignup = async (param) => {
    const model = {
      email: param.email,
      login: param.login,
      password: param.password,
      user_account: {
        username: param.username
      }
    }
      
    return await DataManager.create('usercredential', {model})
      .then(value => {
        toast.success(t(value.data.message));
        return false;
      }, error => {
        if(error.response.data.error)
        return error.response.data.error;
      })
  }
  
  /**
   * 
   * @param {{loginOrEmail, password}} param
   * @returns {(boolean|string)} false or error
   */
  const handleLogin = async (param) => {
    if(param.remember)
      localStorage.setItem('rememberedUser', param.loginOrEmail);
    
    const model = {
      email: param.loginOrEmail,
      login: param.loginOrEmail,
      password: param.password
    }
      
    return await DataManager.auth({model})
      .then(value => {
        setUser(value.UserAccount);
        return false;
      }, error => {
        return error.response.data.error;
      });
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