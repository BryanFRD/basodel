import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import LoginModal from '../login/modal/LoginModal';
import CustomLink from '../../generic/CustomLink'

const SideBarOptionAccount = ({isShown, icon}) => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className={`sidebar-option-account d-flex justify-content-end align-items-center gap-2 w-100`}>
      {!user ?
      <>
      {/* TODO Change !showModal to showModal */}
        <LoginModal show={showModal} setShow={setShowModal} />
        <div className={`d-flex flex-column justify-content-around align-items-center h-100 w-100 ${!isShown ? 'd-none' : ''}`}>
          <div className={`text-nowrap d-flex flex-column gap-2`}>
            <CustomLink
              size='sm'
              className={`text-decoration-none ${theme.link}`}
              onClick={() => setShowModal('login')}>
                {t('generic.login')}
            </CustomLink>
            <CustomLink
              size='sm'
              className={`text-decoration-none ${theme.link}`}
              onClick={() => setShowModal('signup')}>
                {t('generic.signup')}
            </CustomLink>
          </div>
        </div>
      </>
      :
      <>
        
      </>
      }
      <Link to={user ?? '/account'} onClick={() => {
        if(!user)
          setShowModal('login');
      }} className={`${theme.link}`}>
        <Icon icon={icon} fontSize='2.5em' className='pe-none'/>
      </Link>
    </div>
  );
};

export default SideBarOptionAccount;