import React from 'react';
import './SecondNavbarChat.scss';
import { useTranslation } from 'react-i18next';
import ChatInput from './ChatInput';
import ChatContent from './ChatContent';
import { RiCloseLine } from 'react-icons/ri';

const SecondNavbarChat = ({handleClose}) => {
  const { t } = useTranslation();
  
  return (
    <div className={`secondnavbar-chat d-flex flex-column user-select-none`}>
      <div className='d-flex flex-column w-100'>
        <div className='d-flex mt-3'>
          <h4 className='mx-4 text-center mb-0 align-self-center w-100'>
            {t('generic.chat')}
          </h4>
          <RiCloseLine className='ms-auto d-block mt-1 mb-2 m-lg-1 ms-lg-auto mx-3 mx-lg-3 fs-2 cursor-pointer' onClick={handleClose}/>
        </div>
        <hr className='w-100 mt-2 mb-0'/>
      </div>
      <div className={`chat-box w-100 d-flex flex-column`}>
        <ChatContent/>
        <ChatInput/>
      </div>
    </div>
  );
};

export default SecondNavbarChat;