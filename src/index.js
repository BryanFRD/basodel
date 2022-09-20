import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SocketContextProvider from './context/SocketContext';
import ThemeContextProvider from './context/ThemeContext';
import UserContextProvider from './context/UserContext';

//TODO Avertissement quand on change la page et que le jeu est dans un certain 'state'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);