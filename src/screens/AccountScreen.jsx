import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AccountScreen = () => {
  const {t} = useTranslation();
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!user){
      navigate('/');
    }
  }, [user, navigate]);
  
  return (
    <Container fluid className='h-100 d-flex justify-content-center align-items-center'>
      <h1>{t('generic.comingSoon')}</h1>
    </Container>
  );
};

export default AccountScreen;