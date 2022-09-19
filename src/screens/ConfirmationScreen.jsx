import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { DataManager } from '../helpers/DataManager.helper';

const ConfirmationScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const request = useRef();
  
  useEffect(() => {
    if(request.current)
      return;
      
    request.current = DataManager.get()
  }, []);
  
  return (
    <Container fluid className={`d-flex justify-content-center align-items-center ${theme.bgClass} ${theme.text}`}>
      {t('confirmation.screen')}
    </Container>
  )
}
  
export default ConfirmationScreen;