import React, { useContext, useState } from 'react';
import './SecondNavbarChat.scss';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { RiSendPlane2Fill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';

const SecondNavbarChat = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  
  /*************************************************************/
  
  const [messages, setMessages] = useState([]);
  
  const handleSubmitMessage = (event) => {
    console.log(event)
  }
  
  /*************************************************************/
  
  return (
    <div className={`d-flex flex-column align-items-center user-select-none`}>
      <h4 className='mx-4 text-center'>
        {t('generic.chat')}
      </h4>
      <hr className='w-100 mt-2'/>
      <div className='chat-box w-100 d-flex flex-column h-100 gap-5'>
        <div className='chat-message'>
          
        </div>
        <div className='chat-input'>
          <hr />
          <Form className={`d-flex align-items-center gap-3 px-3 ${theme.text}`} onSubmit={handleSubmitMessage}>
            <Form.Control as='textarea' className={`${theme.bgClass} ${theme.text}`}></Form.Control>
            <Button type='submit' className={`${theme.bgClass} border-0 ${theme.sendButtonChat}`}><RiSendPlane2Fill /></Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SecondNavbarChat;