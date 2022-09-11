import React, { useContext, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { UserContext } from '../../../../../context/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpModalTab = ({setShow}) => {
  const { theme } = useContext(ThemeContext)
  const { handleSignup } = useContext(UserContext);
  const { t } = useTranslation();
  const [ hasError, setHasError ] = useState();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const jsonData = Object.fromEntries(new FormData(event.currentTarget));
    const error = await handleSignup(jsonData);
    
    setHasError(error);
    
    if(!error)
      setShow(false);
  }
  
  //TODO Pattern for input
  return (
    <Form className='d-flex flex-column gap-3 p-5 align-items-center' onSubmit={handleSubmit}>
      {hasError ? <h5 className={`${theme.textError} text-center`}>{t('error.signup')}</h5> : <></>}
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.loginLabel')}</Form.Label>
        <Form.Control placeholder={t('placeholder.login')} name='login' className={`${theme.bgClass} ${theme.text}`} required></Form.Control>
      </Form.Group>
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.usernameLabel')}</Form.Label>
        <Form.Control placeholder={t('placeholder.username')} name='username' className={`${theme.bgClass} ${theme.text}`} required></Form.Control>
      </Form.Group>
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.emailLabel')}</Form.Label>
        <Form.Control placeholder={t('placeholder.email')} name='email' className={`${theme.bgClass} ${theme.text}`} required></Form.Control>
      </Form.Group>
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.passwordLabel')}</Form.Label>
        <Form.Control type='password' placeholder={t('placeholder.password')} name='password' className={`${theme.bgClass} ${theme.text}`} required>
        </Form.Control>
      </Form.Group>
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.confirmPasswordLabel')}</Form.Label>
        <Form.Control type='password' placeholder={t('placeholder.password')} name='confirmPassword' className={`${theme.bgClass} ${theme.text}`} required></Form.Control>
      </Form.Group>
      <Form.Group className='w-100'>
        <Form.Check label={t('login.acceptCGU')} name='acceptCGU'></Form.Check>
      </Form.Group>
      <Button variant={theme.submitFormVariant} type='submit' className='px-4 py-2'>{t('login.signupButton')}</Button>
    </Form>
  );
};

export default SignUpModalTab;