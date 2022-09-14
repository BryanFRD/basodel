import BaseModel from "./BaseModel.model";

export default class GameHistory extends BaseModel {
  
  playersId = [];
  information = {};
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}