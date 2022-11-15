export default class BaseModel {
  
  id = -1;
  createdAt = -1;
  updatedAt = -1;
  deletedAt = null;
  
  assign = (props) => {
    const models = require('./index');
    
    for(const key in props) {
      if(!this.hasOwnProperty(key)){
        delete props[key];
        continue;
      }
      
      if(key.endsWith('At')){
        props[key] = new Date(props[key]);
        continue;
      }
      
      if(models[key.upperCaseFirst()]){
        props[key] = new models[key.upperCaseFirst()](props[key]);
        continue;
      }
    }
    
    Object.assign(this, props);
  }
  
}