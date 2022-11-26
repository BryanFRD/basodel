import axios from 'axios';
import Config from '../config/Config';

export let handleLogout;

const BasodelAPI = axios.create({
  baseURL: Config.API.URL,
  withCredentials: true
});

BasodelAPI.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if(error.config.url !== 'auth' && error.response.status === 401 && !originalRequest.retry){
    originalRequest.retry = true;
    
    refreshToken();
    
    return BasodelAPI(originalRequest);
  }
  
  return Promise.reject(error);
});

export const refreshToken = async () => { 
    return BasodelAPI.get('auth')
      .then(response => {
        if(!response)
          return;
        
        return {...response.data};
      }, error => {
        if(handleLogout)
          handleLogout();
        
        return error;
    });
}

export default BasodelAPI;