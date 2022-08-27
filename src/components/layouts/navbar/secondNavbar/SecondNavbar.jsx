import React, { useContext } from 'react';
import './SecondNavbar.scss';
import SecondNavbarChat from './options/SecondNavbarChat';
import SecondNavbarSettings from './options/SecondNavbarSettings';
import { RiCloseLine } from 'react-icons/ri';
import { ThemeContext } from '../../../../context/ThemeContext';

const SecondNavbar = ({secondNav, changeSecondNav}) => {
  const { theme } = useContext(ThemeContext);
  
  const secondNavOptions = {
    chat: (<SecondNavbarChat />),
    settings: (<SecondNavbarSettings />)
  };
  
  return (
    <div id='secondNavbar' className={`h-100 mh-100 px-5 py-3 ${theme.shadow} ${theme.bgClass} ${theme.text}`}>
      <RiCloseLine className='ms-auto d-block d-lg-none m-3 fs-1' />
      {secondNavOptions[secondNav] ?? <></>}
    </div>
  );
};

export default SecondNavbar;