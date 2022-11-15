import BaseModel from "./BaseModel.model";

export default class UserAccountModel extends BaseModel {
  
  username = '';
  xp = 0;
  silver = 0;
  gold = 0;
  blockedUser = [];
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
  getLevel = () => {
    return Math.floor((this.xp * (this.xp + 1)) / 2);
  }
  
  getBlockedUserIndex = (userId) => {
    return this.blockedUser.findIndex((value) => userId === value.id);
  }
  
}