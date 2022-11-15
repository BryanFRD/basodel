import BaseModel from "./BaseModel.model";

export default class ArticleModel extends BaseModel {
  
  title = '';
  image = {};
  silver = 0;
  gold = 0;
  promo = 0;
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}