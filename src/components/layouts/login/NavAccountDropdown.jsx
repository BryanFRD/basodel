import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import useLanguages from '../../../js/useLanguages'

const NavAccountDropdown = (props) => {
  const {
    avatar_size = '2em',
    variant = 'dark',
    isConnected = false
  } = props;
  
  const { t, i18n } = useTranslation();
  const { languages } = useLanguages();
  
  const [isChangingLanguage, setChangingLanguage] = useState(false);
  
  return (<></>
    // <NavDropdown
    // menuVariant={variant}
    // autoClose='outside'
    // onToggle={(event) => {
    //   if(!event)
    //     setChangingLanguage(false)
    // }}    
    // align='end' title={
    //   !isConnected ?
    //   <Icon icon='mdi:account-outline' width={avatar_size}/> : 
    //   <span className='mx-lg-2'>Bernard</span>
    // }>
    //   {!isChangingLanguage ?
    //   <>
    //     {isConnected &&
    //     <>
    //       <NavDropdown.Item>Bernard</NavDropdown.Item>
    //       <NavDropdown.Divider />
    //     </>}
        
    //     <NavDropdown.Item className='d-flex justify-content-between' onClick={() => setChangingLanguage(true)}>
    //       {t('nav_account_dropdown.language')}
    //       <Icon icon='ic:baseline-arrow-drop-down'/>
    //       </NavDropdown.Item>
    //     <NavDropdown.Item>{t('nav_account_dropdown.dark_theme')}</NavDropdown.Item>
    //     <NavDropdown.Divider />
    //     {isConnected ?
    //     <NavDropdown.Item>{t('nav_account_dropdown.logout')}</NavDropdown.Item>
    //     :
    //     <NavDropdown.Item>{t('nav_account_dropdown.login')}</NavDropdown.Item>
    //     }
    //   </>
    //   :
    //   <>
    //     <NavDropdown.Item onClick={() => setChangingLanguage(false)}>
    //       <Icon icon='material-symbols:chevron-left-rounded'/>
    //       {t('nav_account_dropdown.back')}
    //     </NavDropdown.Item>
    //     <NavDropdown.Divider />
    //     {Object.entries(languages).map(([key, value]) => {
    //       return (<NavDropdown.Item key={key + '-key'} lang={key} className={i18n.language === key ? 'selected bg-secondary' : ''} onClick={(e) => {
    //         i18n.changeLanguage(e.target.lang);
    //         setChangingLanguage(false);
    //       }}>{value}</NavDropdown.Item>)
    //     })}
    //   </>
    // }
    // </NavDropdown>
  );
};

export default NavAccountDropdown;