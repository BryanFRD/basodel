import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container'
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import GenericLink from '../components/generic/link/GenericLink';
import LoginModal from '../components/layouts/login/modal/LoginModal';
import Footer from '../components/layouts/Footer';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [ showModal, setShowModal ] = useState(false);
  
  const handleShowModal = (tabName) => {
    setShowModal(tabName);
  }
  
  return (
    <>
      <LoginModal show={showModal} setShow={setShowModal} />
      <Container fluid className={`d-flex flex-column g-0 h-100`}>
        <Container fluid className='d-flex flex-grow-1 w-100 h-auto flex-column gap-5 align-center justify-content-center align-items-center'>
        {user ?
          // <GameWindow />
          <div className='d-flex flex-column gap-5 text-center'>
            <h3>{`${t('generic.welcome')} ${user.username}`}</h3>
            <span>{t('information.game.notImplementedYet')}</span>
          </div>
          :
          <>
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
          </>
        }
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default HomeScreen;