import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { DataManager } from '../helpers/DataManager.helper';

const ConfirmationScreen = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { token } = useParams();
  const request = useRef();
  
  useEffect(() => {
    if(request.current)
      return;
    
    request.current = DataManager.create(`confirmation`, null, {token});
    
    toast.promise(request.current, {
      loading: t('confirmation.email.loading'),
      success: t('confirmation.email.success'),
      error: t('confirmation.email.error')
    }, {
      className: `${theme.bgClassLighter} ${theme.text}`
    });
    
    navigate('/');
  }, [navigate, t, token]);
  
  return (
    <Container fluid className={`d-flex justify-content-center align-items-center ${theme.bgClass} ${theme.text}`}>
      <h3>{t('confirmation.title')}</h3>
    </Container>
  )
}
  
export default ConfirmationScreen;