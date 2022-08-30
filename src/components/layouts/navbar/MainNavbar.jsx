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
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ collapsed, setCollapsed ] = useState(false);
  const [ secondNav, setSecondNav ] = useState(false);
  
  const onClickExpand = () => {
    setIsExpanded(prevValue => !prevValue);
  }
  
  const handleShowModal = (tabName) => {
    setShowModal(tabName);
  }
  
  const handleToggleCollapse = (e) => {
    if(typeof e === 'boolean')
      return;
      
    setCollapsed(e.currentTarget.className.includes('collapsed'));
  }
  
  const changeSecondNav = (secondNavName) => {
    setSecondNav(prevNav => {
      if(prevNav === secondNavName)
        return false;
      
      setIsExpanded(false);
      setCollapsed(false);
        
      return secondNavName;
    });
  }
  
  return (
    <Row className='g-0'>
      <LoginModal show={showModal} setShow={setShowModal} />
      <Col>
      {secondNav && <SecondNavbar secondNav={secondNav} changeSecondNav={changeSecondNav}/>}
      </Col>
      <Col lg='auto'>
      <Navbar id='mainNavBar' expanded={collapsed} variant={theme.variant} expand='lg' onToggle={handleToggleCollapse}
      className={`user-select-none ${collapsed && `${theme.bgClass} ${theme.shadow}`} ${theme.bgLgClass} ${theme.mainNavbarShadow}`}>
        <Navbar.Toggle className={`ms-auto me-3 ms-lg-0 ${theme.bgClass} opacity-50`} onClick={handleToggleCollapse}/>
        <Navbar.Collapse className={`px-3 px-lg-0 mx-lg-0 pb-2 pb-lg-0 ${theme.bgClass}`}>
          <div className='h-100 d-flex flex-column gap-3 gap-lg-0 justify-content-lg-between align-right'>
            <div className='d-flex gap-3 flex-column align-items-lg-end'>
              <NavbarLink
                className={`d-none d-lg-block py-3 fs-2 text-end`}
                onClick={onClickExpand}>
                {isExpanded ?
                  <RiArrowRightSLine/>
                  :
                  <RiArrowLeftSLine/>
                }
              </NavbarLink>
              <NavbarLink
                className={`${theme.bgHover}`}
                to='/'>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>{t('generic.home')}</span>
                  <RiHome2Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
              <NavbarLink
                className={`${theme.bgHover}`}
                to='/shop'>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>{t('generic.shop')}</span>
                  <RiShoppingBasket2Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
              <NavbarLink
                className={`${theme.bgHover}`}
                onClick={() => changeSecondNav('chat')}>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>{t('generic.chat')}</span>
                  <RiChat3Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
            </div>
            <div className='d-flex gap-3 flex-column align-items-lg-end'>
              <NavbarLink
                className={`${theme.bgHover}`}
                onClick={() => changeSecondNav('settings')}>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>{t('generic.settings')}</span>
                  <RiSettings4Line className='d-none d-lg-inline fs-2'/>
              </NavbarLink>
              <NavbarLink
                className={`account-link`}>
                  <span className={isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>
                    {user ?
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
                    }
                  </span>
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