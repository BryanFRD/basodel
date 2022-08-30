import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { ThemeContext } from '../../../../../../context/ThemeContext';

const ChatInput = ({setMessages}) => {
  const { theme } = useContext(ThemeContext);
  const [ messageContent, setMessageContent ] = useState();
  
  const handleSubmitMessage = () => {
    if(!messageContent?.trim())
      return;
    
    setMessages(prevValue => [...prevValue, {sender: Math.random() < 0.5, content: messageContent.trim()}]);
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
      <hr />
      <Form className={`chat-input d-flex align-items-center gap-3 px-3 ${theme.text}`} onSubmit={handleSubmitMessage}>
        <Form.Control
        as='textarea'
        name='messageInput'
        className={`${theme.bgClass} ${theme.text}`}
        value={messageContent}
        onChange={handleOnChangeMessage}
        onKeyDown={handleSubmitInput}></Form.Control>
        <Button className={`${theme.bgClass} border-0 ${theme.sendButtonChat}`} onClick={handleSubmitMessage}><RiSendPlane2Fill /></Button>
      </Form>
    </div>
  );
};

export default ChatInput;