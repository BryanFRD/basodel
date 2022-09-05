import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Phaser from 'phaser';
import DefaultScene from '../../js/game/scene/DefaultScene';

const GameWindow = () => {
  const gameRef = useRef();
  const gameRootRef = useRef();
  
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gameRootRef.current,
      scene: DefaultScene
    };
    
    if(!gameRef.current)
      gameRef.current = new Phaser.Game(config);
  }, []);
  
  return (<div className='w-100 h-100' ref={gameRootRef}></div>);
};

export default GameWindow;