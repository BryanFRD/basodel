import React from 'react';
import './GameWindow.scss';
import { useEffect } from 'react';
import {game} from '../../index';
import { useResizeDetector } from 'react-resize-detector';

const GameWindow = () => {
  const {ref} = useResizeDetector({onResize: (w, h) => {
    game.scale.resize(w, h);
    
  }});
  
  useEffect(() => {
    ref.current.append(game.canvas);
  }, [ref]);
  
  return (<div id='gameRoot' className='w-100 h-100' ref={ref}></div>);
};

export default GameWindow;