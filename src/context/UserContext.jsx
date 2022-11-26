import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { DataManager } from '../helpers/DataManager.helper';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  
  useEffect(() => {
    DataManager.handleLogout = handleLogout;
    
    const refreshUser = async () => {
      const userAccount = await DataManager.refreshToken();
      
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
        // ! L'afpa bloque les emails envoyés
        console.log(`Confirmation: ${value.confirmation}`);
        return false;
      }, error => {
        return error.response.data.error;
      });
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
    
    Cookies.set('authToken', '');
    Cookies.set('accessToken', '');
    
    return false;
  }
  
  const forgotPassword = async (param) => {
    console.log('param:', param);
  }
  
  const reloadUser = async () => {
    return await DataManager.get('UserAccount', {id: user.id, include: ['blockedUser', 'role', 'articles']})
      .then(value => {
        setUser(value.model);
        return false;
      }, error => {
        return error.reponse.data.error;
      });
  }
  
  /**
   * 
   * @param {boolean} softUpdate keep the same instance or not
   * @param {boolean} updateState update user state or not
   * @returns 
   */
  const updateUser = async (softUpdate = false) => {
    return await DataManager.update('UserAccount', {model: user}, {include: ['blockedUser', 'role', 'articles']}, {}, softUpdate)
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
        reloadUser,
        updateUser
      }
    }>{props.children}</UserContext.Provider>);
}

export default UserContextProvider;