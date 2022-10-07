import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import ChatMessage from './ChatMessage';

const ChatContent = ({messages}) => {
  const { theme } = useContext(ThemeContext);
  const chatContentRef = useRef();
  const [ autoScroll, setAutoScroll ] = useState(true);
  
  const handleScrollEvent = ({target}) => {
    setAutoScroll(target.scrollTop === (target.scrollHeight - target.clientHeight));
  }
  
  useEffect(() => {
    chatContentRef.current.addEventListener('scroll', handleScrollEvent);
    
    const resizeObserver = new ResizeObserver(() => {
      setAutoScroll((prevValue) => {
        if(prevValue){
          chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
        
        return prevValue;
      })
    });
    
    resizeObserver.observe(chatContentRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatContentRef])
  
  useEffect(() => {
    if(autoScroll){
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  
  return (
    <div ref={chatContentRef} className={`chat-content px-2 ${theme.customScrollbar}`}>
      {messages.map(message =>
        <ChatMessage key={message.messageId} message={message} />
      )}
    </div>
  );
};

export default ChatContent;