import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../context/ThemeContext';
import GenericLink from '../../../../generic/link/GenericLink';

const SecondNavbarSettings = () => {
  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  
  return (
    <div className={`d-flex flex-column justify-content-center`}>
      <GenericLink className='d-block d-lg-none'>
      </GenericLink>
      <span>{t('generic.settings')}</span>
    </div>
  );
};

export default SecondNavbarSettings;