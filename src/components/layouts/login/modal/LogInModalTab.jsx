import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../context/UserContext';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../context/ThemeContext';
import Button from 'react-bootstrap/Button';
import GenericLink from '../../../generic/link/GenericLink';

const LogInModalTab = ({setShow}) => {
  const { theme } = useContext(ThemeContext)
  const { handleLogin } = useContext(UserContext);
  const { t } = useTranslation();
  const [ hasError, setHasError ] = useState();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = await handleLogin(event);
    
    setHasError(error);
    
    if(!error)
      setShow(false);
  }
  
  //TODO Pattern for input
  return (
    <Form className='d-flex flex-column gap-3 p-5 align-items-center' onSubmit={handleSubmit}>
      {hasError ? <h5 className={`${theme.textError} text-center`}>{t('error.login')}</h5> : <></>}
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.usernameOrEmailLabel')}</Form.Label>
        <Form.Control placeholder={t('placeholder.email')} className={`${theme.bgClass} ${theme.text}`} required></Form.Control>
      </Form.Group>
      <Form.Group className='w-100'>
        <Form.Label>{t('login.passwordLabel')}</Form.Label>
        <Form.Control type='password' placeholder={t('placeholder.password')} className={`${theme.bgClass} ${theme.text}`} required></Form.Control>
      </Form.Group>
      <Form.Group className=' w-100 d-flex flex-column flex-lg-row gap-5 justify-content-lg-between pb-3'>
        <Form.Check label={t('login.rememberMe')}></Form.Check>
        <GenericLink className={'text-decoration-underline'}>{t('login.forgotPassword')}</GenericLink>
      </Form.Group>
      <Button variant={theme.submitFormVariant} type='submit' className='px-4 py-2'>{t('login.loginButton')}</Button>
    </Form>
  );
};

export default LogInModalTab;