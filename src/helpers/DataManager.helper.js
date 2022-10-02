import BasodelAPI, { refreshToken } from '../api/BasodelApi';
import UserAccount from '../models/UserAccount.model';
import * as models from '../models';

export class DataManager {
  
  /**
   * POST
   * 
   * @param {*} route if route is an available model then it will return a Model
   * @param {*} data
   * @param {*} params
   * @return {(BaseModel|Promise<AxiosResponse<any, any>>)}
   */
  static create = async (route, data, params = {}) => {
    const searchParams = new URLSearchParams(params);
    
    BasodelAPI.post(`${route.toLowerCase()}${searchParams.toString()}`, data)
      .then(response => {
        if(response?.data?.model){
          return {model: new models[route](response.data.model)};
        } else {
          return {error: response.data.error};
        }
      }, error => {
        return Promise.reject(error);
      });
  }
  
  /**
   * GET
   * 
   * @param {*} route if route is an available model then it will return a Model
   * @param {*} data
   * @return {(BaseModel|Promise<AxiosResponse<any, any>>)}}
   */
  static get = async (route, data, params) => {
    const searchParams = new URLSearchParams(params);
    
    return BasodelAPI.get(`${route.toLowerCase()}${searchParams.toString()}`, {data})
      .then(response => {
        if(response?.data?.model){
          return {model: new models[route](response.data.model)};
        } else {
          return {error: response.data.error};
        }
      }, error => {
        return Promise.reject(error);
      });
  }
  
  /**
   * UPDATE
   * 
   * @param {*} route  if route is an available model then it will return a Model
   * @param {*} data
   * @param {object}
   * @returns {(BaseModel|Promise<AxiosResponse<any, any>>)}
   */
  static update = async (route, data, params, softUpdate = false) => {
    const searchParams = new URLSearchParams(params);
    
    return BasodelAPI.put(`${route.toLowerCase()}?${searchParams.toString()}`, data)
      .then(response => {
        if(response?.data?.model){
          return {model: new models[route](softUpdate ? data.model : response.data.model)};
        } else {
          return {error: response.data.error};
        }
      }, error => {
        return Promise.reject(error);
      });
  }
  
  /**
   * Authenticate
   * 
   * @param {*} data
   * @returns {(UserAccount|error|Promise)}
   */
  static auth = async (data) => {
    return BasodelAPI.post('auth', data)
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