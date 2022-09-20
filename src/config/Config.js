export default class Config {
  
  static API = {
    URL: process.env.NODE_ENV === 'production' ? 'https://api.basodel.bryan-ferrando.fr' : 'http://localhost:5001'
  }
  
}