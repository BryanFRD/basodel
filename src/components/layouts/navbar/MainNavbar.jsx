import React, { useContext, useState } from 'react';
import './MainNavbar.scss';
import Navbar from 'react-bootstrap/esm/Navbar';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import { 
  RiHome2Line, 
  RiShoppingBasket2Line, 
  RiChat3Line, 
  RiSettings4Line, 
  RiArrowLeftSLine, 
  RiArrowRightSLine, 
  RiAccountCircleLine } from 'react-icons/ri'
import NavbarLink from './NavbarLink';
import LoginModal from '../login/modal/LoginModal';
import { UserContext } from '../../../context/UserContext';
import GenericLink from '../../generic/link/GenericLink';
import SecondNavbar from './secondNavbar/SecondNavbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MainNavbar = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [ navbarState, setNavbarState ] = useState({isExpanded: false, showModal: false, collapsed: false, secondNav: false});
  
  const onClickExpand = () => {
    setNavbarState(prevValue => ({...prevValue, isExpanded: !prevValue.isExpanded}));
  }
  
  const handleShowModal = (tabName) => {
    setNavbarState(prevValue => ({...prevValue, showModal: tabName}));
  }
  
  const handleToggleCollapse = (e) => {
    if(typeof e !== 'boolean')
      return;
    
    setNavbarState(prevValue => ({...prevValue, collapsed: e}));
  }
  
  const changeSecondNav = (secondNavName) => {
    setNavbarState(prevValue => (
      {
        ...prevValue,
        secondNav: (prevValue.secondNav === secondNavName ? false : secondNavName),
        isExpanded: false,
        collapsed: false
      }
      ));
  }
  
  return (
    <Row className='g-0'>
      <LoginModal show={navbarState.showModal} setShow={setNavbarState} />
      <Col>
      {navbarState.secondNav && <SecondNavbar secondNav={navbarState.secondNav} changeSecondNav={changeSecondNav}/>}
      </Col>
      <Col lg='auto'>
      <Navbar id='mainNavBar' expanded={navbarState.collapsed} variant={theme.variant} expand='lg' onToggle={handleToggleCollapse}
      className={`user-select-none ${navbarState.collapsed && `${theme.bgClass} ${theme.shadow}`} ${theme.bgLgClass} ${theme.mainNavbarShadow}`}>
        <Navbar.Toggle className={`ms-auto me-3 ms-lg-0 ${theme.bgClass} opacity-50`} onClick={handleToggleCollapse}/>
        <Navbar.Collapse className={`px-3 px-lg-0 mx-lg-0 pb-2 pb-lg-0 ${theme.bgClass}`}>
          <div className='h-100 d-flex flex-column gap-3 gap-lg-0 justify-content-lg-between align-right'>
            <div className='d-flex gap-3 flex-column align-items-lg-end'>
              <NavbarLink
                className={`d-none d-lg-block py-3 fs-2 text-end`}
                onClick={onClickExpand}>
                {navbarState.isExpanded ?
                  <RiArrowRightSLine/>
                  :
                  <RiArrowLeftSLine/>
                }
              </NavbarLink>
              <NavbarLink
                hover
                to='/'
                navbarState={navbarState}
                title={t('generic.home')}>
                  <RiHome2Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
              <NavbarLink
                hover
                to='/shop'
                navbarState={navbarState}
                title={t('generic.shop')}>
                  <RiShoppingBasket2Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
              <NavbarLink
                hover
                onClick={() => changeSecondNav('chat')}
                navbarState={navbarState}
                title={t('generic.chat')}>
                  <RiChat3Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
            </div>
            <div className='d-flex gap-3 flex-column align-items-lg-end'>
              <NavbarLink
                hover
                onClick={() => changeSecondNav('settings')}
                navbarState={navbarState}
                title={t('generic.settings')}>
                  <RiSettings4Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
              <NavbarLink
                className={`account-link`}
                navbarState={navbarState}
                title={user ?
                  <div>
                    {/* TODO Montrer les infos de l'utilisateur */}
                    <GenericLink to='/account' className={theme.link}>
                      Bernard
                    </GenericLink>
                  </div>
                  :
                  <div className='d-flex flex-column gap-4 gap-lg-1'>
                    <GenericLink
                      className={`${theme.bgHover} text-nowrap px-lg-2 py-1 d-lg-inline text-lg-end`}
                      onClick={() => handleShowModal('login')}>
                        {t('generic.login')}
                    </GenericLink>
                    <GenericLink
                      className={`${theme.bgHover} text-nowrap px-lg-2 py-1 d-lg-inline text-lg-end`}
                      onClick={() => handleShowModal('signup')}>
                        {t('generic.signup')}
                    </GenericLink>
                  </div>
                }>
                  <GenericLink 
                    to={user && '/account'}
                    className={`d-none d-lg-inline h-100 ${theme.link}`}
                    onClick={() => {
                      if(!user)
                        handleShowModal('login');
                    }}>
                      <RiAccountCircleLine className='d-none d-lg-inline fs-2 h-100'/>
                  </GenericLink>
              </NavbarLink>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
      </ Col>
    </Row>
  );
};

export default MainNavbar;