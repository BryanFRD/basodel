import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import useLanguages from '../../../../../../js/useLanguages';

const SecondNavbarSettings = () => {
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
      <h4 className='mx-4 text-center'>
        {t('generic.settings')}
      </h4>
      <hr className='w-100 mt-2'/>
      <div className='w-100 px-3 d-flex flex-column gap-5'>
        <section className='text-center d-flex flex-column gap-3'>
          <h5>
            {t('settings.interface')}
            <hr className='my-1'/>
          </h5>
          <div className='d-flex justify-content-between gap-5'>
            <label htmlFor='languageInput'>{t('generic.language')}</label>
            <select 
              className={`form-select form-select-sm w-auto ${theme.bgClass} ${theme.text}`}
              onChange={handleLangChange}
              value={i18n.language}>
                {
                languages.map((language, index) => 
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
            <hr className='my-1'/>
          </h5>
          <span>{t('generic.comingSoon')}</span>
        </section>
      </div>
    </div>
  );
};

export default SecondNavbarSettings;