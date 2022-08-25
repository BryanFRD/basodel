import React, { useContext, useState } from 'react';
import './MainNavbar.scss';
import Navbar from 'react-bootstrap/esm/Navbar';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import { RiHome2Line, RiChat3Line, RiSettings4Line, RiArrowLeftSLine, RiAccountCircleLine } from 'react-icons/ri'
import NavbarLink from './NavbarLink';

const MainNavbar = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [ isExpanded, setIsExpand ] = useState(false);
  
  const onClickExpand = () => {
    setIsExpand(prevValue => !prevValue);
  }
  
  return (
    <Navbar id='mainNavBar' bg={theme.bg} variant={theme.variant} expand='lg' className='user-select-none'>
      <Navbar.Toggle className='ms-auto me-3 ms-lg-0'/>
      <Navbar.Collapse className='px-3 px-lg-0 mx-lg-0'>
        <div className='h-100 d-flex flex-column gap-3 gap-lg-0 justify-content-lg-between align-right'>
          <div className='d-flex gap-3 flex-column align-items-lg-end'>
            <NavbarLink
              className={`d-none d-lg-block py-3 px-3 ${theme.text}`}
              onClick={onClickExpand}>
              <RiArrowLeftSLine className='fs-2'/>
            </NavbarLink>
            <NavbarLink
              className={`d-flex gap-3 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.bgHover} ${theme.text}`}
              to='/'>
                <span className={isExpanded ? 'd-lg-inline' : 'd-lg-none'}>{t('generic.home')}</span>
                <RiHome2Line className='d-none d-lg-inline fs-2'/>
            </NavbarLink>
            <NavbarLink
              className={`d-flex gap-3 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.bgHover} ${theme.text}`}>
                <span className={isExpanded ? 'd-lg-inline' : 'd-lg-none'}>{t('generic.chat')}</span>
                <RiChat3Line className='d-none d-lg-inline fs-2'/>
            </NavbarLink>
          </div>
          <div className='d-flex gap-3 flex-column align-items-lg-end'>
            <NavbarLink
              className={`d-flex gap-3 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.bgHover} ${theme.text}`}>
                <span className={isExpanded ? 'd-lg-inline' : 'd-lg-none'}>{t('generic.settings')}</span>
                <RiSettings4Line className='d-none d-lg-inline fs-2'/>
            </NavbarLink>
            <NavbarLink
              className={`account-link d-flex gap-3 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.bgHover} ${theme.text}`}>
                <span className={isExpanded ? 'd-lg-inline' : 'd-lg-none'}>{t('generic.account')}</span>
                <RiAccountCircleLine className='d-none d-lg-inline fs-2'/>
            </NavbarLink>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;