import BaseModel from "./BaseModel.model";

export default class Role extends BaseModel {
  
  name = '';
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}