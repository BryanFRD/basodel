import { BaseModel } from "./BaseModel.model";

export class Purchase extends BaseModel {
  
  title = '';
  information = {};
  userAccountId = -1;
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}