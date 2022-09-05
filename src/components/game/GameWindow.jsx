import React from 'react';
import './GameWindow.scss';
import { useEffect } from 'react';
import { useRef } from 'react';
import Phaser from 'phaser';
import BaseScene from '../../js/game/scene/BaseScene';

const GameWindow = () => {
  const gameRef = useRef();
  const gameRootRef = useRef();
  
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      mode: Phaser.Scale.RESIZE,
      parent: gameRootRef.current,
      scene: BaseScene
    };
    
    if(!gameRef.current)
      gameRef.current = new Phaser.Game(config);
  }, []);
  
  return (<div id='gameRoot' className='w-100 h-100' ref={gameRootRef}></div>);
};

export default GameWindow;