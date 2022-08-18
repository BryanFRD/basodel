import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import ThemeContextProvider from './context/ThemeContext';
import UserContextProvider from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);