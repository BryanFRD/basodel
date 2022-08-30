import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { ThemeContext } from '../../../../../../context/ThemeContext';

const ChatInput = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Form className={`chat-input d-flex align-items-center gap-3 px-3 ${theme.text}`}>
      <Form.Control as='textarea' className={`${theme.bgClass} ${theme.text}`}></Form.Control>
      <Button type='submit' className={`${theme.bgClass} border-0 ${theme.sendButtonChat}`}><RiSendPlane2Fill /></Button>
    </Form>
  );
};

export default ChatInput;