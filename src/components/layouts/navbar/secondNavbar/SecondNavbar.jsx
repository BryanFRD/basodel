import React, { useContext } from 'react';
import './SecondNavbar.scss';
import SecondNavbarChat from './options/chat/SecondNavbarChat';
import SecondNavbarSettings from './options/settings/SecondNavbarSettings';
import { RiCloseLine } from 'react-icons/ri';
import { ThemeContext } from '../../../../context/ThemeContext';

const SecondNavbar = ({secondNav, changeSecondNav}) => {
  const { theme } = useContext(ThemeContext);
  
  const secondNavOptions = {
    chat: (<SecondNavbarChat />),
    settings: (<SecondNavbarSettings />)
  };
  
  const handleClose = () => {
    changeSecondNav(false);
  }
  
  return (
    <div id='secondNavbar' className={`h-100 vh-100 mh-100 w-100 py-3 py-lg-2 ${theme.shadow} ${theme.bgClass} ${theme.text}`}>
      <RiCloseLine className='ms-auto d-block m-3 m-lg-0 ms-lg-auto mx-3 mx-lg-3 fs-2 cursor-pointer' onClick={handleClose}/>
      {secondNavOptions[secondNav]}
    </div>
  );
};

export default SecondNavbar;