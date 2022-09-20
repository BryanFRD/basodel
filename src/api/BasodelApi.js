import axios from 'axios';
import Cookies from 'js-cookie';
import Config from '../config/Config';

const BasodelAPI = axios.create({
  baseURL: Config.API.URL
});

BasodelAPI.interceptors.response.use(response => {
  if(response.config.url === 'auth' && response.config.method === 'post'){
    Cookies.set('authToken', response.data.refreshToken);
    BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`;
  }
  
  return response;
}, async error => {
  const originalRequest = error.config;
  if(error.config.url !== 'auth' && error.response.status === 401 && !originalRequest.retry){
    const { accessToken } = refreshToken();
    originalRequest.retry = true;
    
    if(accessToken)
      originalRequest.headers['authorization'] = `Bearer ${accessToken}`;
    
    return BasodelAPI(originalRequest);
  }
  
  return Promise.reject(error);
});

export const refreshToken = async () => {
  const refreshToken = Cookies.get('authToken');
  if(refreshToken){
    BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${refreshToken}`;
    
    return BasodelAPI.get('auth')
      .then(response => {
        if(!response)
          return;
        
        BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`;
        return {accessToken: response.data.accessToken, userAccount: response.data.userAccount};
      }, error => {
        Cookies.set('authToken', '');
        
        return error;
    });
  }
  
  return {};
}

export default BasodelAPI;