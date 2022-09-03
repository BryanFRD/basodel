export class BaseModel {
  
  id = -1;
  createdDate = -1;
  lastUpdatedDate = -1;
  isDeleted = false;
  
  assign = (props) => {
    for(const key in props) {
      if(!this.hasOwnProperty(key)){
        delete props[key];
        continue
      }
      
      if(key.endsWith('Date')){
        props[key] = new Date(props[key]);
      }
    }
    
    Object.assign(this, props);
  }
  
}