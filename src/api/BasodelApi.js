import axios from 'axios';
import Cookies from 'js-cookie';

const BasodelAPI = axios.create({
  baseURL: 'http://localhost:5001/'
});

BasodelAPI.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if(error.config.url !== 'refreshtoken' && error.response.status === 401 && !originalRequest.retry){
    originalRequest.retry = true;
    
    const { accessToken } = refreshToken();
    
    if(accessToken)
      originalRequest.headers['authorization'] = `Bearer ${accessToken}`;
      
    return BasodelAPI(originalRequest);
  }
});

export const refreshToken = async () => {
  const refreshToken = Cookies.get('authToken');
  if(refreshToken){
    BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${refreshToken}`;
    
    let result = {};
    await BasodelAPI.get('refreshtoken')
      .then(response => {
        if(!response)
          return;
        
        console.log('response:', response);
        BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response.data.content.accessToken}`;
        
        result = {accessToken: response.data.content.accessToken, userAccount: response.data.content.userAccount};
      }, error => {
        Cookies.set('authToken', '');
    });
    
    return result;
  }
  return {};
}

export default BasodelAPI;