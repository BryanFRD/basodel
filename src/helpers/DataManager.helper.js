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
    return BasodelAPI.post(route, model);
  }
  
  /**
   * GET
   * 
   * @param {*} route name of the route
   * @param {*} id number or array of number
   */
  static get = async (table, id) => {
    if(!id){
      return BasodelAPI.get(table);
    }
    
    return BasodelAPI.get(table, {model: {id}});
  }
  
  /**
   * Authenticate
   * 
   * @param {*} model model used for authentication
   * @returns {UserAccount, error}
   */
  static auth = async (model) => {
    return BasodelAPI.post('auth', {model})
      .then(response => {
        if(response?.data)
          return {UserAccount: new UserAccount(response.data.userAccount)};
        else {
          return {error: response.response.data.error};
        }
      }, error => {
        return {error};
      });
  }
  
  /**
   * Refresh AccessToken
   * 
   * @returns UserAccount
   */
  static refreshToken = async () => {
    const { userAccount } = await refreshToken();
    
    if(userAccount)
      return new UserAccount(userAccount)
  }
  
}