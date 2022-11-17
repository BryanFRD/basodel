import BaseModel from "./BaseModel.model";

export default class UserAccountModel extends BaseModel {
  
  username = '';
  xp = 0;
  silver = 0;
  gold = 0;
  blockedUser = [];
  articles = [];
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
  getLevel = () => {
    return Math.floor(Math.log(this.xp));
  }
  
  getBlockedUserIndex = (userId) => {
    return this.blockedUser.findIndex(value => userId === value.id);
  }
  
  hasBoughtArticle = (articleId) => {
    return this.articles.findIndex(article => articleId === article.id) !== -1;
  }
  
}