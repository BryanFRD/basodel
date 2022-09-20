import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';

const ShopScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  return (
    <Container fluid className={`d-flex flex-column gap-5 justify-content-center align-items-center ${theme.bgClass} ${theme.text}`}>
      <span>{t('generic.shop')}</span>
      <span>{t('generic.comingSoon')}</span>
    </Container>
  );
};

export default ShopScreen;