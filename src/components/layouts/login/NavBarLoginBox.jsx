import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import useLanguages from '../../../js/useLanguages';

const NavBarLoginBox = () => {
  const { user, handleConnection } = useContext(UserContext);
  const { theme, changeThemeTo } = useContext(ThemeContext);
  
  const { t, i18n} = useTranslation();
  const { languages } = useLanguages();
  
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  
  const toggleLanguageSelect = () => setIsChangingLanguage(!isChangingLanguage);
  
  return (
    <>
      {!user &&
      <>
        <Button 
          variant={`outline-${theme.btnVariant}`}
          size='sm'
          className='m-auto col-12 col-lg-auto'
          onClick={handleConnection}>
          {t('generic.login')}
        </Button>
        <Button 
          variant={theme.btnVariant}
          size='sm'
          className='m-auto col-12 col-lg-auto'
          onClick={handleConnection}>
          {t('generic.signup')}
        </Button>
      </>}
      
      <NavDropdown
      menuVariant={theme.menuVariant}
      autoClose='outside'
      onToggle={(event) => {
        if(!event)
        setIsChangingLanguage(false)
      }}    
      align='end' title={
        !user ?
        <Icon icon='mdi:account-outline' width='2em'/> : 
        <span className='mx-lg-2'>Bernard</span>
      }>
        {!isChangingLanguage ?
        <>
          {user &&
          <>
            <NavDropdown.Item>Bernard</NavDropdown.Item>
            <NavDropdown.Divider />
          </>}
          
          <NavDropdown.Item className='d-flex justify-content-between' onClick={toggleLanguageSelect}>
            {t('generic.language')}
            <Icon icon='material-symbols:chevron-right-rounded' className='align-self-center me-3'/>
            </NavDropdown.Item>
          <NavDropdown.Item
          className='d-flex justify-content-between gap-5 text-nowrap'
          onClick={() => changeThemeTo(theme.name === 'light' ? 'dark' : 'light')}>
            {t('generic.dark_theme')}
            <Form.Check
            type='switch'
            checked={(theme.name === 'dark')}
            onChange={() => {}}
            className='pe-none'/>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          {user ?
          <NavDropdown.Item onClick={handleConnection}>{t('generic.logout')}</NavDropdown.Item>
          :
          <NavDropdown.Item onClick={handleConnection}>{t('generic.login')}</NavDropdown.Item>
          }
        </>
        :
        <>
          <NavDropdown.Item onClick={toggleLanguageSelect}>
            <Icon icon='material-symbols:chevron-left-rounded' className='align-self-center'/>
            {t('generic.back')}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          {Object.entries(languages).map(([key, value]) => {
            return (<NavDropdown.Item key={key + '-key'} lang={key} className={i18n.language === key ? 'bg-secondary' : ''} onClick={(e) => {
              i18n.changeLanguage(e.target.lang);
              setIsChangingLanguage(false);
            }}>{value}</NavDropdown.Item>)
          })}
        </>
      }
      </NavDropdown>
    </>
  );
};

export default NavBarLoginBox;