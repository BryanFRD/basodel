import React, { useState } from 'react';

export const SettingsContext = React.createContext();

const SettingsContextProvider = (props) => {
  const [settings, setSettings] = useState({});
  
  //TODO Settings
  
  return (<SettingsContext.Provider value={{settings, setSettings}}>{props.children}</SettingsContext.Provider>)
}

export default SettingsContextProvider;