import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
  
  constructor() {
    super('DefaultScene');
    
    this.gameRoot = document.querySelector('#gameRoot');
  }
  
  preload = () => {
    console.log('DefaultScene: preload');
  }
  
  create = () => {
    console.log('DefaultScene: create');
    
    const particles = this.add.particles('blue');
    
    const emitter = particles.createEmitter({
      speed:100,
      scale: {start: 1, end: 0},
      blendMode: 'ADD'
    });
    
    const text = this.add.text(400, 300, 'Le jeu ici');
    
    emitter.startFollow(text);
  }
  
  update = () => {
    
    // console.log(this.game);
    // console.log(document.querySelector('#gameRoot').offsetWidth, document.querySelector('#gameRoot').offsetHeight);
    // console.log('DefaultScene: update');
  }
  
}

export default BaseScene;