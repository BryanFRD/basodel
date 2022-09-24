import BasodelAPI, { refreshToken } from '../api/BasodelApi';
import UserAccount from '../models/UserAccount.model';
import * as models from '../models';

export class DataManager {
  
  /**
   * POST
   * 
   * @param {*} route if route is an available model then it will return a Model
   * @param {*} params
   * @return {(BaseModel|Promise<AxiosResponse<any, any>>)}
   */
  static create = async (route, params) => {
    const promise = BasodelAPI.post(route.toLowerCase(), params);
    
    if(models[route])
      return new models[route](await promise.response.data);
      
    return promise;
  }
  
  /**
   * GET
   * 
   * @param {*} route if route is an available model then it will return a Model
   * @param {*} params
   * @return {(BaseModel|Promise<AxiosResponse<any, any>>)}}
   */
  static get = async (route, params) => {
    const promise = BasodelAPI.get(route.toLowerCase(), {params});
    
    if(models[route])
      return new models[route](await promise.response.data);
      
    return promise;
  }
  
  /**
   * UPDATE
   * 
   * @param {*} route  if route is an available model then it will return a Model
   * @param {*} params 
   * @returns {(BaseModel|Promise<AxiosResponse<any, any>>)}
   */
  static update = async (route, params) => {
    const promise = BasodelAPI.put(route.toLowerCase(), params);
    
    if(models[route])
      return new models[route](await promise.response.data);
    
    return promise;
  }
  
  /**
   * Authenticate
   * 
   * @param {*} params
   * @returns {(UserAccount|error|Promise)}
   */
  static auth = async (params) => {
    return BasodelAPI.post('auth', params)
      .then(response => {
        if(response?.data){
          return {UserAccount: new UserAccount(response.data.userCredential.user_account)};
        } else {
          return {error: response.response.data.error};
        }
      }, error => {
        return Promise.reject(error);
      });
  }
  
  /**
   * Refresh AccessToken
   * 
   * @returns {(UserAccount|undefined)}
   */
  static refreshToken = async (handleLogout) => {
    const { userCredential } = await refreshToken(handleLogout);
    
    if(userCredential)
      return new UserAccount(userCredential.user_account);
  }
  
}