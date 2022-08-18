import React, { useState } from 'react';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(false);
  
  const handleConnection = () => {
    setUser(!user);
  }
  
  return (<UserContext.Provider value={{user, handleConnection}}>{props.children}</UserContext.Provider>);
}

export default UserContextProvider;