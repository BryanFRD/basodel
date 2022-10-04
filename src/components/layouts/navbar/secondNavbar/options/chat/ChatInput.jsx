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
  const [ showEmoji, setShowEmoji ] = useState(false);
  const { t } = useTranslation();
  const [ messageContent, setMessageContent ] = useState('');
  const inputRef = useRef();
  
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
  
  const handleSubmitInput = (event) => {
    if(event.keyCode === 13 && event.shiftKey === false){
      event.preventDefault();
      handleSubmitMessage(event);
    }
  }
  
  const handleShowPicker = () => {
    setShowEmoji(prevValue => !prevValue);
  }
  
  const handleEmojiClick = (picker) => {
    setMessageContent(prevValue => prevValue + picker.emoji);
    setShowEmoji(false);
    inputRef?.current?.focus();
  }
  
  return (
    <div className='d-flex flex-column gap-3'>
      <hr className='mt-0'/>
      <Form className={`position-relative chat-input d-flex align-items-center justify-content-center gap-3 px-3 ${theme.text}`} onSubmit={handleSubmitMessage}>
        {user ?
          <>
            <Form.Control
              onFocus={() => setShowEmoji(false)}
              as='textarea'
              ref={inputRef}
              name='messageInput'
              className={`${theme.bgClass} ${theme.text} ${theme.customScrollbar}`}
              value={messageContent}
              onChange={handleOnChangeMessage}
              onKeyDown={handleSubmitInput}
              maxLength={255}>
            </Form.Control>
            <div className='cursor-pointer' onClick={handleShowPicker}>
              <Emoji unified='1f603' emojiStyle='native'/>
            </div>
            {showEmoji &&
              <div className='position-absolute' style={{bottom: '14rem', maxHeight: '50vh'}}>
                <EmojiPicker
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