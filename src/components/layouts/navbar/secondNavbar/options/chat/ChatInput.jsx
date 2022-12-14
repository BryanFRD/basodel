import React, { useContext, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import { UserContext } from '../../../../../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../../../../../context/SocketContext';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import {RiSendPlane2Fill} from 'react-icons/ri';

const ChatInput = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [ emojiState, setEmojiState ] = useState({show: false, unified: `1f60${Math.floor(Math.random() * 9)}`});
  const { t } = useTranslation();
  const [ messageContent, setMessageContent ] = useState('');
  const inputRef = useRef();
  const formRef = useRef();
  
  const handleSubmitMessage = () => {
    if(!user || !messageContent?.trim())
      return;
      
    const content = {
      userAccountId : user.id,
      message: messageContent.trim()
    }
    
    socket.emit('sendMessage', content);
    
    setMessageContent('');
  }
  
  const handleOnChangeMessage = (event) => {
    setMessageContent(event.target.value);
  }
  
  const handleKeyDown = (event) => {
    if(event.keyCode === 13 && event.shiftKey === false){
      event.preventDefault();
      handleSubmitMessage(event);
      
      inputRef.current.style.height = '2.6em';
    }
  }
  
  const handleInput = () => {
    const defaultHeight = '2.25em';
    
    inputRef.current.style.height = defaultHeight;
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    
    inputRef.current.scrollTop = inputRef.current.scrollHeight;
  }
  
  const handleShowPicker = () => {
    setEmojiState(prevValue => ({...prevValue, show: !prevValue.show}));
  }
  
  const handleEmojiClick = (picker) => {
    setMessageContent(prevValue => prevValue + picker.emoji);
    setEmojiState(prevValue => ({...prevValue, show: !prevValue.show}));
    inputRef?.current?.focus();
  }
  
  const handleNewEmojiUnified = () => {
    setEmojiState(prevValue => ({
      ...prevValue,
      unified: generateNewEmojiUnified(prevValue.unified)
    }))
  }
  
  const generateNewEmojiUnified = (previousValue) => {
    const unified = `1f60${Math.floor(Math.random() * 9)}`;
    
    return unified === previousValue ? generateNewEmojiUnified(previousValue) : unified;
  }
  
  return (
    <div className='chat-input-content d-flex flex-column gap-3'ref={formRef}>
      <hr className='mt-0'/>
      <div className='d-flex mx-4 gap-3'>
        <Form
          className={`position-relative chat-input d-flex align-items-center justify-content-center w-100 rounded ${theme.bgClassLighter} ${theme.text}`}
          onSubmit={handleSubmitMessage}>
          {user ?
            <>
              <Form.Control
                onFocus={() => setEmojiState(prevValue => ({...prevValue, show: false}))}
                as='textarea'
                placeholder={t('chat.messagePlaceholder')}
                ref={inputRef}
                className={`bg-transparent ${theme.text} ${theme.customScrollbar} border-0 outline-0 shadow-none w-100`}
                value={messageContent}
                onChange={handleOnChangeMessage}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                maxLength={255}>
              </Form.Control>
              <div
                className='cursor-pointer emojiPicker px-2 align-self-start pb-1'
                onClick={handleShowPicker}
                onMouseEnter={handleNewEmojiUnified}>
                <Emoji unified={emojiState.unified} emojiStyle='twitter'/>
              </div>
              {emojiState.show &&
                <div className='position-absolute' style={{bottom: '6rem'}}>
                  <EmojiPicker
                    searchPlaceHolder={t('generic.search')}
                    lazyLoad={true}
                    emojiStyle='twitter'
                    onEmojiClick={handleEmojiClick}
                    theme={theme.emojiPicker}/>
                </div>
              }
            </>
            :
            <span className={`w-100 text-center ${theme.bgClass}`}>{t('error.mustBeLogged')}</span>
          }
        </Form>
        {messageContent &&
          <RiSendPlane2Fill
            className={`chat-submitButton align-self-center cursor-pointer text-white ${theme.bgHover}`}
            onClick={handleSubmitMessage}/>
        }
      </div>
    </div>
  );
};

export default ChatInput;