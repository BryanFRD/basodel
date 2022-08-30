import React from 'react';

const ChatMessage = ({message}) => {
  return (
    <div className={`chat-message ${message.sender ? 'message-sender' : 'message-receiver'}`}>
      {message.content}
    </div>
  );
};

export default ChatMessage;