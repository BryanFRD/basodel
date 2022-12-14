import React, { useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import Config from '../config/Config';
import { UserContext } from './UserContext';

export const SocketContext = React.createContext();
const socket = io(Config.API.URL, {withCredentials: true});

const SocketContextProvider = (props) => {
  const {user} = useContext(UserContext);
  
  useEffect(() => {
    socket.connect();
    
    return () => socket.disconnect();
  }, [user]);
  
  return (<SocketContext.Provider value={{socket}}>{props.children}</SocketContext.Provider>);
}

export default SocketContextProvider;