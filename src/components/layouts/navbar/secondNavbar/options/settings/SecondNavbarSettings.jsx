import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import useLanguages from '../../../../../../js/useLanguages';
import { RiCloseLine } from 'react-icons/ri';

const SecondNavbarSettings = ({handleClose}) => {
  const { theme, changeThemeTo } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [ changeTheme, setChangeTheme ] = useState(theme.name === 'dark');
  
  const { languages } = useLanguages();
  
  useEffect(() => {
    
  }, [changeTheme])
  
  const handleChangeTheme = () => {
    setChangeTheme(prevValue => !prevValue);
    changeThemeTo(!changeTheme ? 'dark' : 'light');
  }
  
  const handleLangChange = ({currentTarget}) => {
    i18n.changeLanguage(currentTarget.options[currentTarget.selectedIndex].value)
  }
  
  return (
    <div className={`d-flex flex-column align-items-center user-select-none`}>
      <div className='d-flex flex-column w-100 mt-3'>
        <div className='d-flex mt-3 me-0 me-lg-3'>
          <h4 className='mx-3 text-center mb-0 align-self-center w-100 me-n3'>
            {t('generic.settings')}
          </h4>
          <RiCloseLine className='ms-auto d-block my-3 m-lg-1 me-5 fs-2 cursor-pointer' onClick={handleClose}/>
        </div>
        <hr className='w-100 mt-2'/>
      </div>
      <div className='w-100 px-3 d-flex flex-column gap-5'>
        <section className='text-center d-flex flex-column gap-3'>
          <h5>
            {t('settings.interface')}
            <hr className='my-1 mt-3'/>
          </h5>
          <div className='d-flex justify-content-between gap-5'>
            <label htmlFor='languageInput'>{t('generic.language')}</label>
            <select 
              className={`form-select form-select-sm w-auto ${theme.bgClass} ${theme.text}`}
              onChange={handleLangChange}
              value={i18n.language}>
                {languages.map((language, index) => 
                  <option
                    value={language.lang}
                    key={`langKey-${index}`}>
                      {language.name}
                  </option>
                )}
            </select>
          </div>
          <div className='form-check form-check-reverse form-switch text-start'>
            <label htmlFor='darkModeInput'>{t('generic.darkMode')}</label>
            <input type="checkbox" id="darkModeInput" className='form-check-input' checked={changeTheme} onChange={handleChangeTheme}/>
          </div>
        </section>
        <section className='text-center d-flex flex-column gap-3'>
          <h5>
            {t('settings.game')}
            <hr className='my-1 mt-3'/>
          </h5>
          <span>{t('generic.comingSoon')}</span>
        </section>
      </div>
    </div>
  );
};

export default SecondNavbarSettings;