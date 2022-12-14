import React, { useContext } from 'react';
import './SecondNavbar.scss';
import SecondNavbarChat from './options/chat/SecondNavbarChat';
import SecondNavbarSettings from './options/settings/SecondNavbarSettings';
import { ThemeContext } from '../../../../context/ThemeContext';

const SecondNavbar = ({secondNav, changeSecondNav, messages}) => {
  const { theme } = useContext(ThemeContext);
  
  const handleClose = () => {
    changeSecondNav(false);
  }
  
  const secondNavOptions = {
    chat: (<SecondNavbarChat handleClose={handleClose} messages={messages}/>),
    settings: (<SecondNavbarSettings handleClose={handleClose}/>)
  };
  
  return (
    <div id='secondNavbar' className={`h-100 vh-100 mh-100 w-100 pb-3 ${theme.shadow} ${theme.bgClass} ${theme.text}`}>
      {secondNavOptions[secondNav]}
    </div>
  );
};

export default SecondNavbar;