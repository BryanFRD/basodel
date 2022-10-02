export default class BaseModel {
  
  id = -1;
  createdAt = -1;
  updatedAt = -1;
  
  assign = (props) => {
    for(const key in props) {
      if(!this.hasOwnProperty(key)){
        delete props[key];
        continue;
      }
      
      if(key.endsWith('At')){
        props[key] = new Date(props[key]);
      }
    }
    
    Object.assign(this, props);
  }
  
}