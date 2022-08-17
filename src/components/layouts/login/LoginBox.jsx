import React from 'react';
import { useTranslation } from 'react-i18next';
import NavAccountDropdown from './NavAccountDropdown';

const LoginBox = (props) => {
  const {t} = useTranslation();
  const isConnected = false;
  
  const {
    size = 'sm',
    variant = 'dark'
  } = props;
  
  return (<></>
    // <>
    //   {!isConnected &&
    //   <>
    //     <Button variant='outline-light' size={size} className='m-auto'>{t('login_box.login')}</Button>
    //     <Button variant='light' size={size} className='m-auto'>{t('login_box.signup')}</Button>
    //   </>}
      
    //   <NavAccountDropdown isConnected={isConnected} avatar_size='2em' variant={variant}/>
    // </>
  );
};

export default LoginBox;