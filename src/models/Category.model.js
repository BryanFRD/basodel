import BaseModel from "./BaseModel.model";
import ArticleModel from "./Article.model";

export default class CategoryModel extends BaseModel {
  
  title = '';
  articles = [];
  
  constructor(props){
    super();
    
    this.assign(props);
    
    this.articles = props?.articles?.map(article => new ArticleModel(article));
  }
  
}