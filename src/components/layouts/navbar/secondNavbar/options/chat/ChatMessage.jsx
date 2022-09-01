import React, { useContext, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import GenerikLink from '../../../../../generic/link/GenericLink';

const ChatMessage = ({message}) => {  
  const { theme } = useContext(ThemeContext);
  
  const handleBlockUser = () => {
    console.log('Blocking: ' + message);
  }
  
  return (
    <div className={`chat-message-container ${theme.chat} ${message.sender ? 'message-sender' : 'message-receiver'}`}>
      <div className={`chat-message d-flex flex-column`}>
        <Dropdown>
          <Dropdown.Toggle variant={theme.variant} className={`chat-username mb-2`}>Bernard</Dropdown.Toggle>
          <Dropdown.Menu variant={theme.variant}>
            <Dropdown.Item className={theme.textDanger}>
              Block user
            </Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
        {/* <GenerikLink className={`chat-username mb-2`}>Bernard</GenerikLink> */}
        <span>{message.content}</span>
      </div>
    </div>
  );
};

export default ChatMessage;