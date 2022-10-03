import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { DataManager } from '../helpers/DataManager.helper';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const { t } = useTranslation();
  const [user, setUser] = useState();
  
  useEffect(() => {
    const refreshUser = async () => {
      const userAccount = await DataManager.refreshToken(handleLogout);
      
      if(userAccount)
        setUser(userAccount);
      else
        setUser(undefined);
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
        toast.success(t(value.message));
        return false;
      }, error => {
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
    setUser(undefined);
    Cookies.set('accessToken', '');
    Cookies.set('authToken', '');
    
    return false;
  }
  
  const forgotPassword = async (param) => {
    console.log('param:', param);
  }
  
  /**
   * 
   * @param {boolean} softUpdate keep the same instance or not
   * @param {boolean} updateState update user state or not
   * @returns 
   */
  const updateUser = async (softUpdate = false) => {
    return DataManager.update('UserAccount', {model: user}, {include: ["blockedUser", "role"]}, softUpdate)
      .then(value => { 
        setUser(value.model);
        return false;
      }, error => {
        return error.response.data.error;
      });
  }
  
  return (<UserContext.Provider
    value={
      {
        user,
        handleSignup,
        handleLogin,
        handleLogout,
        forgotPassword,
        updateUser
      }
    }>{props.children}</UserContext.Provider>);
}

export default UserContextProvider;