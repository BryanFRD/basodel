import axios from "axios";
import Cookies from "js-cookie";

const BasodelAPI = axios.create({
  baseURL: 'http://localhost:5001/'
});

BasodelAPI.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if(error.config.url !== 'refreshtoken' && error.response.status === 401 && !originalRequest.retry){
    originalRequest.retry = true;
    
    const refreshToken = Cookies.get('authToken');
    
    if(refreshToken){
      BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${refreshToken}`;
      console.log('Refreshing token');
      
      await BasodelAPI.post('refreshtoken')
      .then((response) => {
        BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`;
        originalRequest.headers['authorization'] = `Bearer ${response.data.accessToken}`;
      })
      .catch((error) => {
        Cookies.set('authToken', '');
      });
      
      return BasodelAPI(originalRequest);
    }
  }
});

export default BasodelAPI;