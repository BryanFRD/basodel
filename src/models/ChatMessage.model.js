import BaseModel from "./BaseModel.model";

export default class ChatMessageModel extends BaseModel {
  
  message = '';
  userAccountId = -1;
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}