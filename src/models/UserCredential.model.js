import { BaseModel } from "./BaseModel.models";

export class UseCredential extends BaseModel {
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}