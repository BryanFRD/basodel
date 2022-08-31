import React from 'react';

const ChatMessage = ({message}) => {
  return (
    <div className={`chat-message-container ${message.sender ? 'message-sender' : 'message-receiver'}`}>
      <div className={`chat-message`}>
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;