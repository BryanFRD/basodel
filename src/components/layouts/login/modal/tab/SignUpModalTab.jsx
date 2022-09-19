import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { UserContext } from '../../../../../context/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Validator from '../../../../../validators/Validator.validator';
import { useEffect } from 'react';

const SignUpModalTab = ({setShow}) => {
  const { theme } = useContext(ThemeContext)
  const { handleSignup } = useContext(UserContext);
  const { t } = useTranslation();
  const [ hasError, setHasError ] = useState();
  
  const [ values, setValues ] = useState({
    login: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptCGU: false
  });
  
  const [ validations, setValidations ] = useState({});
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const jsonData = Object.fromEntries(new FormData(event.currentTarget));
    const error = await handleSignup(jsonData);
    
    setHasError(error);
    
    if(!error)
      setShow(false);
  }
  
  const handleInputChange = (event) => {
    setValues(prevValue => {
      const target = event.target;
      
      if(target.type === 'checkbox')
        prevValue[target.name] = target.checked;
      else
        prevValue[target.name] = target.value.replace(/\s/g, '');
      
      return {...prevValue}
    });
  }
  
  useEffect(() => {
    setValidations(prevValues => {
      const login = Validator.login(values.login);
      const email = Validator.email(values.email);
      const username = Validator.username(values.username);
      const password = Validator.password(values.password) && values.password === values.confirmPassword;
      const confirmPassword = Validator.password(values.confirmPassword) && values.password === values.confirmPassword;
      const allValidated = (
        login &&
        email &&
        username &&
        password &&
        confirmPassword &&
        values.acceptCGU
      );
      
      return {login, email, username, password, confirmPassword, allValidated};
    });
  }, [values]);
  
  return (
    <Form className='d-flex flex-column gap-3 p-5 align-items-center' onSubmit={handleSubmit}>
      {hasError ? <h5 className={`${theme.textError} text-center`}>{t(hasError)}</h5> : <></>}
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.loginLabel')}</Form.Label>
        <Form.Control
          placeholder={t('placeholder.login')}
          name='login'
          onChange={handleInputChange}
          value={values.login}
          className={`${theme.bgClass} ${theme.text} ${validations.login ? 'border-success' : 'border-danger'}`}
          maxLength={50}
          required>
        </Form.Control>
      </Form.Group>
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.usernameLabel')}</Form.Label>
        <Form.Control
          placeholder={t('placeholder.username')}
          name='username'
          onChange={handleInputChange}
          value={values.username}
          className={`${theme.bgClass} ${theme.text} ${validations.username ? 'border-success' : 'border-danger'}`}
          maxLength={12}
          required>
          </Form.Control>
      </Form.Group>
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.emailLabel')}</Form.Label>
        <Form.Control
          placeholder={t('placeholder.email')}
          name='email'
          onChange={handleInputChange}
          value={values.email}
          className={`${theme.bgClass} ${theme.text} ${validations.email ? 'border-success' : 'border-danger'}`}
          maxLength={50}
          required>
          </Form.Control>
      </Form.Group>
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.passwordLabel')}</Form.Label>
        <Form.Control
          type='password'
          placeholder={t('placeholder.password')}
          name='password'
          onChange={handleInputChange}
          value={values.password}
          className={`${theme.bgClass} ${theme.text} ${validations.password ? 'border-success' : 'border-danger'}`}
          maxLength={255}
          required>
        </Form.Control>
      </Form.Group>
      <Form.Group className='w-100 pb-4'>
        <Form.Label>{t('login.confirmPasswordLabel')}</Form.Label>
        <Form.Control
          type='password'
          placeholder={t('placeholder.password')}
          name='confirmPassword'
          onChange={handleInputChange}
          value={values.confirmPassword}
          className={`${theme.bgClass} ${theme.text} ${validations.confirmPassword ? 'border-success' : 'border-danger'}`}
          maxLength={255}
          required>
        </Form.Control>
      </Form.Group>
      <Form.Group className='w-100'>
        <Form.Check label={t('login.acceptCGU')} name='acceptCGU' onChange={handleInputChange} checked={values.acceptCGU}></Form.Check>
      </Form.Group>
      <Button variant={theme.submitFormVariant} type='submit' className='px-4 py-2' disabled={!validations.allValidated}>{t('login.signupButton')}</Button>
    </Form>
  );
};

export default SignUpModalTab;