import Phaser from "phaser";

class DefaultScene extends Phaser.Scene {
  
  constructor() {
    super('DefaultScene');
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
    console.log('DefaultScene: update');
  }
  
}

export default DefaultScene;