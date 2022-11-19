import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import Footer from '../components/layouts/Footer';

const NotFoundScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <div className='h-100 d-flex flex-column'>
      <Container fluid className={`d-flex justify-content-center align-items-center flex-grow-1 ${theme.text}`}>
        <h1>{t('error.404')}</h1>
      </Container>
      <Footer />
    </div>
  );
};

export default NotFoundScreen;