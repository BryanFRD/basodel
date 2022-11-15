import BaseModel from "./BaseModel.model";

export default class GameHistoryModel extends BaseModel {
  
  playersId = [];
  information = {};
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}