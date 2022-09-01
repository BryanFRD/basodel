import React, { useContext, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import GenerikLink from '../../../../../generic/link/GenericLink';

const ChatMessage = ({message}) => {  
  const { theme } = useContext(ThemeContext);
  const [ showOverlay, setShowOverlay ] = useState(false);
  
  const handleShowPopover = () => {
    setShowOverlay(prevValue => !prevValue);
  }
  
  const handleBlockUser = () => {
    console.log('Blocking: ' + message);
  }
  
  return (
    <div className={`chat-message-container ${theme.chat} ${message.sender ? 'message-sender' : 'message-receiver'}`}>
      <div className={`chat-message d-flex flex-column`}>
        <GenerikLink className={`chat-username mb-2`} onClick={handleShowPopover}>Bernard</GenerikLink>
        <Overlay
          show={showOverlay}
          placement='bottom'>
          <Popover>
            <Popover.Header as='h3'>Bernard-Henri</Popover.Header>
          </Popover>
        </Overlay>
        <span>{message.content + "Coucou c'est moi !"}</span>
      </div>
    </div>
  );
};

export default ChatMessage;