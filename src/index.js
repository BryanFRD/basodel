import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Config from './config/Config';
import SocketContextProvider from './context/SocketContext';
import ThemeContextProvider from './context/ThemeContext';
import UserContextProvider from './context/UserContext';
import Phaser from 'phaser';

//TODO Avertissement quand on change la page et que le jeu est dans un certain 'state'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <SocketContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

export const game = new Phaser.Game(Config.phaserConfig);