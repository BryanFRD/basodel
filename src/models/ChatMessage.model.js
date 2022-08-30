import { BaseModel } from "./BaseModel.model";

export class ChatMessage extends BaseModel {
  
  message = '';
  userAccountId = -1;
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}