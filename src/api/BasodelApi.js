import axios from 'axios';
import Cookies from 'js-cookie';
import Config from '../config/Config';

export let handleLogout;

const BasodelAPI = axios.create({
  baseURL: Config.API.URL
});

BasodelAPI.interceptors.response.use(response => {
  if(response.data?.authToken){
    setTokens('authToken', response.data.authToken, response.data.authTokenExpires);
    
    delete response.data.authToken;
  }
  
  if(response.data?.accessToken){
    setTokens('accessToken', response.data.accessToken, response.data.accessTokenExpires);
    
    BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response?.data?.accessToken}`;
    
    delete response.data.accessToken;
  }
  
  return response;
}, async error => {
  const originalRequest = error.config;
  if(error.config.url !== 'auth' && error.response.status === 401 && !originalRequest.retry){
    originalRequest.retry = true;
    
    const { accessToken } = refreshToken();
    
    originalRequest.headers['authorization'] = `Bearer ${accessToken}`;
    
    return BasodelAPI(originalRequest);
  }
  
  return Promise.reject(error);
});

export const refreshToken = async () => {
  const authToken = Cookies.get('authToken');
  
  if(authToken){
    BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${authToken}`;
    
    return BasodelAPI.get('auth')
      .then(response => {
        if(!response)
          return;
          
        BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response.data?.accessToken}`;
        
        setTokens('authToken', response.data?.authToken, response.data?.authTokenExpires);
        setTokens('accessToken', response.data?.accessToken, response.data?.accessTokenExpires);
        
        return {...response.data};
      }, error => {
        Cookies.set('authToken', '');
        Cookies.set('accessToken', '');
        
        if(handleLogout)
          handleLogout();
        
        return error;
    });
  }
  
  return {};
}

const setTokens = (name, value, expires) => {
  Cookies.set(name, value, {
    secure: true,
    expires: new Date(Date.now() + (expires ? expires * 1000 : -1))
  });
}

export default BasodelAPI;