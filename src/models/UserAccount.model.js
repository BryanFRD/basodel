import { BaseModel } from "./BaseModel.model";

export class UserAccount extends BaseModel {
  
  username = '';
  xp = 0;
  silver = 0;
  gold = 0;
  blockedUsed = [];
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
  getLevel = () => {
    return Math.floor((this.xp * (this.xp + 1)) / 2);
  }
  
}