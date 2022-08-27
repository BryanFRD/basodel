import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../context/ThemeContext';
import GenericLink from '../../../../generic/link/GenericLink';

const SecondNavbarSettings = () => {
  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  
  return (
    <div className={`d-flex flex-column align-items-center`}>
      <h4 className='mx-4 text-center'>
        {t('generic.settings')}
      </h4>
      <hr className='w-100 mt-2'/>
      <div className='w-100 px-3'>
        <section className='text-center'>
          <h5>
            {t('settings.interface')}
            <hr className='my-1'/>
          </h5>
        </section>
        <section className='text-center'>
          <h5>
            {t('settings.game')}
            <hr className='my-1'/>
          </h5>
          <span>{t('generic.comming-soon')}</span>
        </section>
      </div>
    </div>
  );
};

export default SecondNavbarSettings;