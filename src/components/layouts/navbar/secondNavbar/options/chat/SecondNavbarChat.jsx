import React from 'react';
import './SecondNavbarChat.scss';
import { useTranslation } from 'react-i18next';
import ChatInput from './ChatInput';
import ChatContent from './ChatContent';
import { RiCloseLine } from 'react-icons/ri';

const SecondNavbarChat = ({handleClose, messages}) => {
  const {t} = useTranslation();
  
  return (
    <div className={`secondnavbar-chat d-flex flex-column user-select-none`}>
      <div className='d-flex flex-column w-100 mt-3'>
        <div className='d-flex my-3 me-3'>
          <h4 className='mx-3 text-center mb-0 align-self-center w-100 me-n3 me-lg-n4'>
            {t('generic.chat')}
          </h4>
          <RiCloseLine className='ms-auto d-block my-3 m-lg-1 me-5 fs-2 cursor-pointer' onClick={handleClose}/>
        </div>
        <hr className='w-100 mt-2 mb-0'/>
      </div>
      <div className={`chat-box w-100 d-flex flex-column`}>
        <ChatContent messages={messages}/>
        <ChatInput/>
      </div>
    </div>
  );
};

export default SecondNavbarChat;