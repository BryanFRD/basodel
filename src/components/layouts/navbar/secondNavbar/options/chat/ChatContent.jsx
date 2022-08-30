import React from 'react';
import ChatMessage from './ChatMessage';

const ChatContent = ({messages}) => {
  return (
    <div className='chat-content d-flex flex-column justify-content-end px-2'>
      {messages.map((message, index) => <>
        <ChatMessage key={`messageIndex-${index}`} message={message} />
      </>)}
    </div>
  );
};

export default ChatContent;