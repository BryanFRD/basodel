import BaseModel from "./BaseModel.model";

export default class ImageModel extends BaseModel {
  
  src = '';
  alt = '';
  
  constructor(props){
    super();
    
    this.assign(props);
  }
  
}