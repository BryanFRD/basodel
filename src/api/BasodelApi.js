import axios from 'axios';
import Cookies from 'js-cookie';
import Config from '../config/Config';

let _handleLogout;

const BasodelAPI = axios.create({
  baseURL: Config.API.URL
});

BasodelAPI.interceptors.response.use(response => {
  if(response.config.url === 'auth' && response.config.method === 'post'){
    const accessTokenExpires = response?.data?.accessTokenExpires;
    const refreshTokenExpires = response?.data?.refreshTokenExpires;
    const now = Date.now();
    
    Cookies.set('accessToken', response.data?.accessToken, {
      secure: true,
      expires: new Date(now + (accessTokenExpires ? accessTokenExpires * 1000 : -1))
    })
    
    Cookies.set('authToken', response.data?.refreshToken, {
      secure: true,
      expires: new Date(now + (refreshTokenExpires ? refreshTokenExpires * 1000 : -1))
    });
    BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response?.data?.accessToken}`;
  }
  
  return response;
}, async error => {
  const originalRequest = error.config;
  if(error.config.url !== 'auth' && error.response.status === 401 && !originalRequest.retry){
    originalRequest.retry = true;
    
    const { accessToken } = refreshToken();
    
    if(accessToken)
      originalRequest.headers['authorization'] = `Bearer ${accessToken}`;
    
    return BasodelAPI(originalRequest);
  }
  
  return Promise.reject(error);
});

export const refreshToken = async (handleLogout) => {
  if(!_handleLogout)
    _handleLogout = handleLogout;
  
  const refreshToken = Cookies.get('authToken');
  if(refreshToken){
    BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${refreshToken}`;
    
    return BasodelAPI.get('auth')
      .then(response => {
        if(!response)
          return;
          
        BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response.data?.accessToken}`;
        
        const accessTokenExpires = response?.data?.accessTokenExpires;
        const refreshTokenExpires = response?.data?.refreshTokenExpires;
        const now = Date.now();
        
        Cookies.set('accessToken', response.data?.accessToken, {
          secure: true,
          expires: new Date(now + (accessTokenExpires ? accessTokenExpires * 1000 : -1))
        })
        
        Cookies.set('authToken', response.data?.refreshToken, {
          secure: true,
          expires: new Date(now + (refreshTokenExpires ? refreshTokenExpires * 1000 : -1))
        });
        return {...response.data};
      }, error => {
        Cookies.set('accessToken', '');
        Cookies.set('authToken', '');
        
        if(_handleLogout)
          _handleLogout();
        
        return error;
    });
  }
  
  return {};
}

export default BasodelAPI;