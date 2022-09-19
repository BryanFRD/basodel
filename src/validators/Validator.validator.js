import Joi from 'joi';

export default class Validator {
  
  static #defaultOptions = {
    allowUnknown: false
  }
  
  static #login = Joi.string().min(5).max(50).alphanum();
  static #email = Joi.string().email({tlds: {allow: false}});
  static #password = Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/));
  static #username = Joi.string().min(5).max(12).alphanum();
  
  static login = (value) => {
    return !this.#login.validate(value, this.#defaultOptions).error;
  }
  
  static email = (value) => {
    return !this.#email.validate(value, this.#defaultOptions).error;
  }
  
  static password = (value) => {
    return !this.#password.validate(value, this.#defaultOptions).error;
  }
  
  static username = (value) => {
    return !this.#username.validate(value, this.#defaultOptions).error;
  }
  
}