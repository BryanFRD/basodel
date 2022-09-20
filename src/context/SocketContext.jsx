import React, { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Config from '../config/Config';

export const SocketContext = React.createContext();

const SocketContextProvider = (props) => {
  const socket = useMemo(() => io.connect(Config.API.URL), []);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages(prevValue => [...prevValue, data]);
    });
  }, [socket]);
  
  return (<SocketContext.Provider value={{socket, messages}}>{props.children}</SocketContext.Provider>)
}

export default SocketContextProvider;