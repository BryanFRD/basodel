import React from 'react';
import SecondNavbarChat from './SecondNavbarChat';
import SecondNavbarSettings from './SecondNavbarSettings';

const SecondNavbar = ({secondNav, changeSecondNav}) => {
  
  const secondNavOptions = {
    chat: (<SecondNavbarChat />),
    settings: (<SecondNavbarSettings />)
  };
  
  return (
    <div id='secondNav'>
      {secondNavOptions[secondNav] ?? <></>}
    </div>
  );
};

export default SecondNavbar;