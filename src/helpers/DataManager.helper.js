import BasodelAPI from "../api/BasodelApi"

export class DataManager {
  
  /**
   * POST
   * 
   * @param {*} route name of the route
   * @param {*} model model to create
   */
  static create = async (route, model) => {
    const response = await BasodelAPI.post(route, model)
      .then(resp => {
        return resp;
      })
      .catch(error => {return error});
      
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
  
  
  
  
}