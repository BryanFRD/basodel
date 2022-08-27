import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';

const ShopScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  return (
    <Container fluid className={`d-flex justify-content-center align-items-center ${theme.bgClass} ${theme.text}`}>
      {t('generic.shop')}
    </Container>
  );
};

export default ShopScreen;