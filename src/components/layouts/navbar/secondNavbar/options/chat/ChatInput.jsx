import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import { UserContext } from '../../../../../../context/UserContext';
import { useTranslation } from 'react-i18next';

const ChatInput = ({setMessages}) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [ messageContent, setMessageContent ] = useState();
  
  const handleSubmitMessage = () => {
    if(!user || !messageContent?.trim())
      return;
    
    setMessages(prevValue => [...prevValue, {      
      id: Math.random().toString(16).slice(2),
      sender: Math.random() < 0.5,
      content: messageContent.trim()
    }]);
    
    setMessageContent('');
  }
  
  const handleOnChangeMessage = (event) => {
    setMessageContent(event.target.value);
  }
  
  const handleSubmitInput = (event) => {
    if(event.keyCode === 13 && event.shiftKey === false){
      event.preventDefault();
      handleSubmitMessage();
    }
  }
  
  return (
    <div className='d-flex flex-column gap-3'>
      <hr className='mt-0'/>
      <Form className={`chat-input d-flex align-items-center justify-content-center gap-3 px-3 ${theme.text}`} onSubmit={handleSubmitMessage}>
        {user ?
          <>
            <Form.Control
              as='textarea'
              name='messageInput'
              className={`${theme.bgClass} ${theme.text} ${theme.customScrollbar}`}
              value={messageContent}
              onChange={handleOnChangeMessage}
              onKeyDown={handleSubmitInput}
              maxLength={255}>
            </Form.Control>
            <Button
              className={`${theme.bgClass} border-0 ${theme.sendButtonChat}`}
              onClick={handleSubmitMessage}>
                <RiSendPlane2Fill />
            </Button>
          </>
          :
          <span className={`error ${theme.bgClass}`}>{t('error.mustBeLogged')}</span>
        }
      </Form>
    </div>
  );
};

export default ChatInput;