import { BaseModel } from "./BaseModel.model";

export class GameHistory extends BaseModel {
  
  playersId = [];
  information = {};
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}