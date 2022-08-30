import { BaseModel } from "./BaseModel.model";

export class Role extends BaseModel {
  
  name = '';
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}