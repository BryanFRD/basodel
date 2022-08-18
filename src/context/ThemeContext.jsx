import axios from 'axios';
import React, { useState } from 'react';

const themes = {light: {}, dark: {}};

export const ThemeContext = React.createContext();

const ThemeContextProvider = (props) => {
  if(!localStorage.hasOwnProperty('usedTheme'))
    localStorage.setItem('usedTheme', 'light');
  
  const usedTheme = themes[localStorage.getItem('usedTheme')] ?? themes['light'];
  
  const [theme, setTheme] = useState(usedTheme);
  
  const changeThemeTo = (themeName) => {
    if(!themes[themeName] || themeName === theme.name)
      return;
    
    setTheme(themes[themeName]);
    localStorage.setItem('usedTheme', themeName);
  }
  
  return (<ThemeContext.Provider value={{theme, changeThemeTo}}>{props.children}</ThemeContext.Provider>)
}

export const initThemes = () => {
  console.log('Test')
  for(const t in themes){
    axios.get(`/assets/themes/${t}.json`).then(({data}) => themes[t] = data);
  }
}

export default ThemeContextProvider;