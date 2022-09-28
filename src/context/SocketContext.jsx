import Cookies from 'js-cookie';
import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import Config from '../config/Config';
import { UserContext } from './UserContext';

export const SocketContext = React.createContext();
const socket = io(Config.API.URL, {auth: {}});

const SocketContextProvider = (props) => {
  const {user} = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [latency, setLatency] = useState(-1);
  
  useEffect(() => {
    socket.auth.token = Cookies.get('accessToken');
    socket.connect();
    
    return () => socket?.disconnect();
  }, [user]);
  
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
    
  }, []);
  
  return (<SocketContext.Provider value={{socket, messages, latency}}>{props.children}</SocketContext.Provider>);
}

export default SocketContextProvider;