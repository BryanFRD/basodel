export class BaseModel {
  
  id = -1;
  isDeleted = false;
  
  assign = (props) => {
    for(const key in props) {
      if(!this.hasOwnProperty(key)){
        delete props[key];
        continue
      }
    }
    
    Object.assign(this, props);
  }
  
}