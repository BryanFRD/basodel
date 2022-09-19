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
      
    request.current = Promise.resolve(DataManager.get(`confirmation/${token}`));
    
    toast.promise(request.current, {
      loading: t('confirmation.loading'),
      success: t('confirmation.success'),
      error: t('confirmation.error')
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