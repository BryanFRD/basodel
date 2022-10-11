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
    return BasodelAPI.post(`${route.toLowerCase()}${this.buildSearchParams(params)}`, data)
      .then(response => {
        if(!response?.data?.error){
          return {...response.data, model: this.getModel(route, response.data.model)};
        } else {
          return {error: response?.data?.error};
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
    return BasodelAPI.get(`${route.toLowerCase()}${this.buildSearchParams(params)}`, {data})
      .then(response => {
        if(!response?.data?.error){
          return {...response.data, model: this.getModel(route, response.data.model)};
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
    return BasodelAPI.put(`${route.toLowerCase()}${this.buildSearchParams(params)}`, data)
      .then(response => {
        if(!response?.data?.error){
          return {...response.data, model: this.getModel(route, softUpdate ? data.model : response.data.model)};
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
        if(!response?.data?.error){
          return {UserAccount: new UserAccount(response.data.model.user_account)};
        } else {
          return {error: response.data.error};
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
  static refreshToken = async () => {
    const {model} = await refreshToken();
    
    if(model)
      return new UserAccount(model.user_account);
  }
  
  static getModel = (modelName, props) => {
    return models[modelName] ? new models[modelName](props) : null;
  }
  
  static buildSearchParams = (params) => {
    if(!params)
      return '';
    
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if(typeof value === 'object'){
        value.forEach(v => {
          searchParams.append(key, v);
        });
      } else {
        searchParams.append(key, value);
      }
    })
    
    return `?${searchParams}`;
  }
  
}