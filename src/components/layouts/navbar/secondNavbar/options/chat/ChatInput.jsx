import React, { useContext, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import { UserContext } from '../../../../../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../../../../../context/SocketContext';
import EmojiPicker, { Emoji } from 'emoji-picker-react';

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
      event.target.style.height = '2.25em';
    }
  }
  
  const handleInput = () => {
    const defaultHeight = '2.25em';
    console.log(inputRef.current.style.height);
    inputRef.current.style.height = defaultHeight;
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
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
      <Form
        className={`position-relative chat-input d-flex align-items-center justify-content-center rounded mx-4 ${theme.bgClassLighter} ${theme.text}`}
        onSubmit={handleSubmitMessage}>
        {user ?
          <>
            <Form.Control
              onFocus={() => setEmojiState(prevValue => ({...prevValue, show: false}))}
              as='textarea'
              ref={inputRef}
              className={`bg-transparent ${theme.text} ${theme.customScrollbar} border-0 outline-0 shadow-none`}
              value={messageContent}
              onChange={handleOnChangeMessage}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              maxLength={255}>
            </Form.Control>
            <div
              className='cursor-pointer emojiPicker px-2 align-self-start py-1'
              onClick={handleShowPicker}
              onMouseEnter={handleNewEmojiUnified}>
              <Emoji unified={emojiState.unified} emojiStyle='native'/>
            </div>
            {emojiState.show &&
              <div className='position-absolute' style={{bottom: '6rem'}}>
                <EmojiPicker
                  searchPlaceHolder=''
                  lazyLoad={true}
                  emojiStyle='native'
                  onEmojiClick={handleEmojiClick}
                  theme={theme.emojiPicker}/>
              </div>
            }
          </>
          :
          <span className={`${theme.bgClass}`}>{t('error.mustBeLogged')}</span>
        }
      </Form>
    </div>
  );
};

export default ChatInput;