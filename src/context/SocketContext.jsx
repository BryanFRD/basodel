import Cookies from 'js-cookie';
import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import Config from '../config/Config';
import { UserContext } from './UserContext';

const socket = io.connect(Config.API.URL);
export const SocketContext = React.createContext();

const SocketContextProvider = (props) => {
  const {user} = useContext(UserContext);
  // const socket = useMemo(() => io.connect(Config.API.URL, {auth: {token: (user.id ? Cookies.get('accessToken') : '')}}), [user.id]);
  const [messages, setMessages] = useState([]);
  const [latency, setLatency] = useState(-1);
  
  // useEffect(() => {
    //   const socketIO = io.connect(Config.API.URL, {
      //     auth: {token: (user.id ? Cookies.get('accessToken') : '')},
      //   });
      //   return () => socketIO?.disconnect();
      // }, [user])
      
  useEffect(() => {
    const pingInterval = setInterval(() => {
      console.log('latency:', latency);
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