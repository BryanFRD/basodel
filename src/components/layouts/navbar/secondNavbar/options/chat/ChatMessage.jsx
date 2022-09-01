import React, { useContext } from 'react';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import GenerikLink from '../../../../../generic/link/GenericLink';

const ChatMessage = ({message}) => {  
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`chat-message-container ${theme.chat} ${message.sender ? 'message-sender' : 'message-receiver'}`}>
      <div className={`chat-message d-flex flex-column`}>
        <GenerikLink className={`chat-username mb-2`}>Bernard</GenerikLink>
        <span>{message.content}</span>
      </div>
    </div>
  );
};

export default ChatMessage;