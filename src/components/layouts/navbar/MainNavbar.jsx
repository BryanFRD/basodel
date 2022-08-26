import React, { useContext, useState, useRef } from 'react';
import './MainNavbar.scss';
import Navbar from 'react-bootstrap/esm/Navbar';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import { RiHome2Line, RiChat3Line, RiSettings4Line, RiArrowLeftSLine, RiArrowRightSLine, RiAccountCircleLine } from 'react-icons/ri'
import NavbarLink from './NavbarLink';
import LoginModal from '../login/modal/LoginModal';
import { UserContext } from '../../../context/UserContext';
import GenericLink from '../../generic/link/GenericLink';

const MainNavbar = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [ isExpanded, setIsExpand ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ collapsed, setCollapsed ] = useState(false);
  
  const onClickExpand = () => {
    setIsExpand(prevValue => !prevValue);
  }
  
  const handleShowModal = (tabName) => {
    if(tabName !== false || tabName !== 'login' || tabName !== 'signup')
      tabName = 'login';
      
    setShowModal(tabName);
  }
  
  const handleToggleCollapse = (e) => {
    if(typeof e === 'boolean')
      return;
      
    setCollapsed(e.currentTarget.className.includes('collapsed'));
  }
  
  return (
    <>
      <LoginModal show={showModal} setShow={setShowModal} />
      <Navbar id='mainNavBar' variant={theme.variant} expand='lg' onToggle={handleToggleCollapse}
      className={`user-select-none ${collapsed ? `${theme.bgClass} ${theme.shadow}` : ''} ${theme.bgLgClass} ${theme.mainNavbarShadow}`}>
        <Navbar.Toggle className={`ms-auto me-3 ms-lg-0 ${theme.bgClass} opacity-50`} onClick={handleToggleCollapse}/>
        <Navbar.Collapse className={`px-3 px-lg-0 mx-lg-0 ${theme.bgClass}`}>
          <div className='h-100 d-flex flex-column gap-3 gap-lg-0 justify-content-lg-between align-right'>
            <div className='d-flex gap-3 flex-column align-items-lg-end'>
              <NavbarLink
                className={`d-none d-lg-block py-3 px-3 ${theme.text}`}
                onClick={onClickExpand}>
                {isExpanded ?
                  <RiArrowRightSLine className='fs-2'/>
                  :
                  <RiArrowLeftSLine className='fs-2'/>
                }
              </NavbarLink>
              <NavbarLink
                className={`d-flex gap-3 w-100 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.bgHover} ${theme.text}`}
                to='/'>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>{t('generic.home')}</span>
                  <RiHome2Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
              <NavbarLink
                className={`d-flex gap-3 w-100 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.bgHover} ${theme.text}`}>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>{t('generic.chat')}</span>
                  <RiChat3Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
            </div>
            <div className='d-flex gap-3 flex-column align-items-lg-end'>
              <NavbarLink
                className={`d-flex gap-3 w-100 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.bgHover} ${theme.text}`}>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>{t('generic.settings')}</span>
                  <RiSettings4Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
              <NavbarLink
                className={`account-link d-flex gap-3 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.text}`}
                onClick={() => handleShowModal('login')}>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>
                    {user ?
                      <div>
                        dsqds
                      </div>
                      :
                      <div className='d-flex flex-column gap-1'>
                        <GenericLink
                          className={`${theme.bgHover} text-nowrap px-2 py-1 d-lg-inline w-100 text-lg-end`}
                          onClick={() => handleShowModal('login')}>
                            {t('generic.login')}
                        </GenericLink>
                        <GenericLink
                          className={`${theme.bgHover} text-nowrap px-2 py-1 d-lg-inline text-lg-end`}
                          onClick={() => handleShowModal('signup')}>
                            {t('generic.signup')}
                        </GenericLink>
                      </div>
                    }
                  </span>
                  <RiAccountCircleLine className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MainNavbar;