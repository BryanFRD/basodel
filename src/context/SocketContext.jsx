import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Config from '../config/Config';

export const SocketContext = React.createContext();

const SocketContextProvider = (props) => {
  const socket = useMemo(() => {
    return io.connect(Config.API.URL, {
      auth: {token: Cookies.get('authToken')}
    });
  }, []);
  const [messages, setMessages] = useState([]);
  const [latency, setLatency] = useState(-1);
  
  useEffect(() => {
    const pingInterval = setInterval(() => {
      const start = Date.now();
      
      socket.emit('ping', () => {
        setLatency(Date.now() - start);
      });
    }, 1000);
    
    socket.on('receiveMessage', (data) => {
      setMessages(prevValue => [...prevValue, data]);
    });
    
    return () => {
      clearInterval(pingInterval);
      
      socket.off('receiveMessage');
    }
  }, [socket]);
  
  return (<SocketContext.Provider value={{socket, messages, latency}}>{props.children}</SocketContext.Provider>);
}

export default SocketContextProvider;