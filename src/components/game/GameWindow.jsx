import React, { useRef } from 'react';
import './GameWindow.scss';
import { useEffect } from 'react';
import {game} from '../../index';

const GameWindow = () => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current.append(game.canvas);
  }, [ref]);
  
  return (<div id='gameRoot' className='w-100 h-100' ref={ref}></div>);
};

export default GameWindow;