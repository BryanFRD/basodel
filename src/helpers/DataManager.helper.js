import BasodelAPI, { refreshToken } from '../api/BasodelApi';
import UserAccount from '../models/UserAccount.model';

export class DataManager {
  
  /**
   * POST
   * 
   * @param {*} route
   * @param {*} params
   * @return {Promise<AxiosResponse<any, any>>}
   */
  static create = async (route, params) => {
    return BasodelAPI.post(route, params);
  }
  
  /**
   * GET
   * 
   * @param {*} route
   * @param {*} params
   * @return {Promise<AxiosResponse<any, any>>}
   */
  static get = async (route, params) => {
    return BasodelAPI.get(route, params);
  }
  
  /**
   * Authenticate
   * 
   * @param {*} params
   * @returns {{UserAccount, error}}
   */
  static auth = async (params) => {
    return BasodelAPI.post('auth', params)
      .then(response => {
        if(response?.data){
          return {UserAccount: new UserAccount(response.data.userAccount)};
        } else {
          return {error: response.response.data.error};
        }
      }, error => {
        return {error};
      });
  }
  
  /**
   * Refresh AccessToken
   * 
   * @returns {UserAccount}
   */
  static refreshToken = async () => {
    const { userAccount } = await refreshToken();
    
    if(userAccount)
      return new UserAccount(userAccount);
  }
  
}