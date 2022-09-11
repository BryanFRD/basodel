import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../../context/UserContext';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../context/ThemeContext';
import Button from 'react-bootstrap/Button';
import GenericLink from '../../../../generic/link/GenericLink';
import { RiArrowLeftSLine } from 'react-icons/ri';

const LogInModalTab = ({setShow}) => {
  const { theme } = useContext(ThemeContext)
  const { handleLogin, forgotPassword } = useContext(UserContext);
  const { t } = useTranslation();
  const [ hasError, setHasError ] = useState();
  const [ showForgotPasswordTab, setShowForgotPasswordTab ] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const jsonData = Object.fromEntries(new FormData(event.currentTarget));
    const error = await handleLogin(jsonData);
    
    setHasError(error);
    
    if(!error)
      setShow(false);
  }
  
  const handleForgotPassword = (event) => {
    event.preventDefault();
    forgotPassword(event);
    toggleForgotPassword(false);
  }
  
  const toggleForgotPassword = (value) => {
    setShowForgotPasswordTab(value);
  }
  
  //TODO Pattern for input, remember password & forgot password
  return (
    <>
      {showForgotPasswordTab ?
        <>
          <GenericLink
            className={`d-flex gap-3 pt-5 ps-3`} 
            onClick={() => toggleForgotPassword(false)}>
              <RiArrowLeftSLine className='fs-3'/>
              <span className='fs-5'>{t('generic.back')}</span>
          </GenericLink>
          <div className={`text-center pt-3 fs-5 pt-5`}>{t('information.resetPassword')}</div>
          <Form className='d-flex flex-column gap-3 p-5 align-items-center' onSubmit={handleForgotPassword}>
            <Form.Group className='w-100 pb-4'>
              <Form.Label>{t('login.emailLabel')}</Form.Label>
              <Form.Control placeholder={t('placeholder.email')} name='email' className={`${theme.bgClass} ${theme.text}`} required></Form.Control>
            </Form.Group>
            <Button variant={theme.submitFormVariant} type='submit' className='px-4 py-2'>{t('login.resetPassword')}</Button>
          </Form>
        </>
      :
        <Form className='d-flex flex-column gap-3 p-5 align-items-center' onSubmit={handleSubmit}>
          {hasError && <h5 className={`${theme.textError} text-center`}>{t('error.login')}</h5>}
          <Form.Group className='w-100 pb-4'>
            <Form.Label>{t('login.loginOrEmailLabel')}</Form.Label>
            <Form.Control placeholder={t('placeholder.email')} name='loginOrEmail' className={`${theme.bgClass} ${theme.text}`} required>
            </Form.Control>
          </Form.Group>
          <Form.Group className='w-100'>
            <Form.Label>{t('login.passwordLabel')}</Form.Label>
            <Form.Control type='password' placeholder={t('placeholder.password')} name='password' className={`${theme.bgClass} ${theme.text}`} required>
            </Form.Control>
          </Form.Group>
          <Form.Group className=' w-100 d-flex flex-column flex-lg-row gap-5 py-3 justify-content-lg-between pb-3'>
            <Form.Check label={t('login.rememberMe')} name='remember'></Form.Check>
            <GenericLink className={'text-decoration-underline'} onClick={() => toggleForgotPassword(true)}>{t('login.forgotPassword')}</GenericLink>
          </Form.Group>
          <Button variant={theme.submitFormVariant} type='submit' className='px-4 py-2'>{t('login.loginButton')}</Button>
        </Form>
      }
    </>
  );
};

export default LogInModalTab;