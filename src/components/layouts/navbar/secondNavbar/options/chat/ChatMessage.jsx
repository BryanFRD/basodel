import React, { useContext } from 'react';
import { ThemeContext } from '../../../../../../context/ThemeContext';

const ChatMessage = ({message}) => {  
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`chat-message-container ${theme.chat} ${message.sender ? 'message-sender' : 'message-receiver'}`}>
      <div className={`chat-message d-flex flex-column`}>
        <span className={`chat-username`}>Bernard</span>
        <span>{message.content}</span>
      </div>
    </div>
  );
};

export default ChatMessage;