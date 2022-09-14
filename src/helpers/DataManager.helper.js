import Cookies from 'js-cookie';
import BasodelAPI, { refreshToken } from '../api/BasodelApi';
import UserAccount from '../models/UserAccount.model';

export class DataManager {
  
  /**
   * POST
   * 
   * @param {*} route name of the route
   * @param {*} model model to create
   */
  static create = async (route, model) => {
    const response = await BasodelAPI.post(route, model);
      
    return response;
  }
  
  /**
   * GET
   * 
   * @param {*} route name of the route
   * @param {*} id number or array of number
   */
  static get = async (table, id) => {
    if(!id){
      
    } else {
      if(typeof id === Array){
        
      } else {
        
      }
    }
  }
  
  /**
   * Authenticate
   * 
   * @param {*} model model used for authentication
   * @returns 
   */
  static auth = async (model) => {
    let user;
    
    const error = await BasodelAPI.post('auth', {model})
      .then(response => {
        Cookies.set('authToken', response.data.content.refreshToken);
        BasodelAPI.defaults.headers.common['authorization'] = `Bearer ${response.data.content.accessToken}`;
        
        user = new UserAccount(response.data.content.user_account);
      }, error => {
        return error;
      })
      .catch(error => error);
    
    return {user, error};
  }
  
  static refreshToken = async () => {
    const { userAccount } = await refreshToken();
    
    if(userAccount)
      return new UserAccount(userAccount)
  }
  
}