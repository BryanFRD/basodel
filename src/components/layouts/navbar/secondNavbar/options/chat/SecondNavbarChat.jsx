import React, { useContext, useState } from 'react';
import './SecondNavbarChat.scss';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import ChatInput from './ChatInput';
import ChatContent from './ChatContent';

const SecondNavbarChat = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  
  /*************************************************************/
  
  const [messages, setMessages] = useState([]);
  
  /*************************************************************/
  
  return (
    <div className={`secondnavbar-chat d-flex flex-column align-items-center user-select-none`}>
      <h4 className='mx-4 text-center'>
        {t('generic.chat')}
      </h4>
      <hr className='w-100 mt-2'/>
      <div className={`chat-box w-100 d-flex flex-column`}>
        <ChatContent messages={messages}/>
        <ChatInput setMessages={setMessages}/>
      </div>
    </div>
  );
};

export default SecondNavbarChat;