import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AccountScreen = () => {
  const {t} = useTranslation();
  
  return (
    <Container fluid className='h-100 d-flex justify-content-center align-items-center'>
      <h1>{t('generic.comingSoon')}</h1>
    </Container>
  );
};

export default AccountScreen;