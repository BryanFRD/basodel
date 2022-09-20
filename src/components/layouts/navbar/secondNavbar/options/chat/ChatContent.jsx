import React, { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../../../../../../context/SocketContext';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import ChatMessage from './ChatMessage';

const ChatContent = () => {
  const { theme } = useContext(ThemeContext);
  const chatContentRef = useRef();
  const [ autoScroll, setAutoScroll ] = useState(true);
  const { messages } = useContext(SocketContext);
  
  const handleScrollEvent = ({target}) => {
    setAutoScroll(target.scrollTop === (target.scrollHeight - target.clientHeight));
  }
  
  useEffect(() => {
    chatContentRef.current.addEventListener('scroll', handleScrollEvent);
  }, [chatContentRef])
  
  useEffect(() => {
    if(autoScroll){
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div ref={chatContentRef} className={`chat-content px-2 ${theme.customScrollbar}`}>
      {messages.map(message => <>
        <ChatMessage key={message.id} message={message} />
      </>)}
    </div>
  );
};

export default ChatContent;