import Phaser from 'phaser';
import BaseScene from '../js/game/scene/BaseScene';

export default class Config {
  
  static API = {
    URL: process.env.NODE_ENV === 'production' ? 'https://api.basodel.bryan-ferrando.fr' : 'http://localhost:5001'
  }
  
  static phaserConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.NONE,
    parent: null,
    scene: BaseScene,
    render: {
      pixelArt: true
    }
  }
  
}