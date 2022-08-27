import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../context/ThemeContext';

const SecondNavbarChat = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  return (
    <div className={`d-flex flex-column align-items-center user-select-none`}>
      <h4 className='mx-4 text-center'>
        {t('generic.chat')}
      </h4>
      <hr className='w-100 mt-2'/>
      <div className='w-100 px-3 d-flex flex-column gap-5'>
        {t('generic.comingSoon')}
      </div>
    </div>
  );
};

export default SecondNavbarChat;