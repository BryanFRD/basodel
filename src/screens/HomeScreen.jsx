import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container'
import { useTranslation } from 'react-i18next';
import GameWindow from '../components/game/GameWindow';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import GenericLink from '../components/generic/link/GenericLink';
import LoginModal from '../components/layouts/login/modal/LoginModal';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [ showModal, setShowModal ] = useState(false);
  
  const handleShowModal = (tabName) => {
    if(tabName !== false || tabName !== 'login' || tabName !== 'signup')
      tabName = 'login';
      
    setShowModal(tabName);
  }
  
  return (
    <>
      <LoginModal show={showModal} setShow={setShowModal} />
      <Container fluid className={`${theme.bgClass} ${theme.text} g-0 h-100 w-100`}>
        {user ?
          <GameWindow />
          :
          <Container fluid className='d-flex w-100 flex-column gap-5 align-center justify-content-center align-items-center'>
            {t('error.mustBeLogged')}
            <div className='d-flex flex-column flex-lg-row gap-5'>
              <GenericLink
                className={`btn ${theme.btnOutline} text-nowrap`}
                onClick={() => handleShowModal('login')}>
                  {t('generic.login')}
              </GenericLink>
              <GenericLink 
                className={`btn ${theme.btnOutline} text-nowrap`}
                onClick={() => handleShowModal('signup')}>
                  {t('generic.signup')}
              </GenericLink>
            </div>
          </Container>
        }
      </Container>
    </>
  );
};

export default HomeScreen;