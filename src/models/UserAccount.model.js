import { BaseModel } from "./BaseModel.model";

export class UserAccount extends BaseModel {
  
  username = '';
  email = '';
  xp = 0;
  silver = 0;
  gold = 0;
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
  getLevel = () => {
    return Math.floor((this.xp * (this.xp + 1)) / 2);
  }
  
}

/** 
 * 
 * userCredential -> useAccount : 1,1x0,1 
 * 
 * purchase -> userAccount : 1,1x0,n
 * 
 * gameHistory -> userAccount : 1,nx0,n
 * 
*/