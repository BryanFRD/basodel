export class ObjectHelper {
  
  static isEqual = (obj1, obj2) => {
    for(const key in obj1){
      if(!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key])
        return false;
    }
    return true;
  }
  
}