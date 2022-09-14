import BaseModel from "./BaseModel.model";

export default class ChatMessage extends BaseModel {
  
  message = '';
  userAccountId = -1;
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}