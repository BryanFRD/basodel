import BaseModel from "./BaseModel.model";

export default class RoleModel extends BaseModel {
  
  name = '';
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}