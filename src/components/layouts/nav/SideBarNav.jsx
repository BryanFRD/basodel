import React, { useContext, useEffect, useState, useRef } from 'react';
import '../../scss/SideBarNav.scss';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import SideBarOption from './SideBarOption';
import { useTranslation } from 'react-i18next';
import useBreakpoints from '../../../js/useBreakpoints';
import { Navbar } from 'react-bootstrap';
import SideBarOptionAccount from './SideBarOptionAccount';

const SideBarNav = ({mainRef, footerRef}) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const { breakpoints } = useBreakpoints();
  
  const sideBarNav = useRef();
  
  const [navWidth, setNavWidth] = useState('0%');
  const [isShown, setIsShown] = useState(false);
  
  useEffect(() => {
    const lg = breakpoints.lg;
    
    sideBarNav.current.style.width = lg ? `calc(75px + ${navWidth})` : '0px';
    mainRef.current.style.marginRight = lg ? `calc(75px + ${navWidth})` : '0px';
    footerRef.current.style.marginRight = lg ? `calc(75px + ${navWidth})` : '0px';
  }, [mainRef, footerRef, navWidth, breakpoints]);
  
  const handleToggleNav = () => {
    setNavWidth(!isShown ? '5%' : '0%');
    setIsShown(!isShown);
  }
  
  return (
    <Navbar id='sideBarNav' ref={sideBarNav} className={`d-none d-lg-block py-0 ${theme.bgClass} ${theme.text} ${theme.shadow}`}>
      <div className='secondary-nav-menu' ></div>
      <div className='nav-menu h-100'>
        <div className='w-100'>
          <SideBarOption icon={isShown ? 'ion:close-sharp' : 'charm:menu-hamburger'}
            onClick={handleToggleNav}
            className={`my-1 mb-3 ${theme.link}`}/>
          <SideBarOption
            icon='material-symbols:home-outline-rounded'
            to='/'
            isShown={isShown}
            className={`${theme.link} ${theme.bgHover} text-decoration-none`}
            name={t('generic.home')}/>
          <SideBarOption
            icon='ph:chat-circle-dots'
            isShown={isShown}
            onClick={(e) => {console.log(e)}}
            className={`${theme.link} ${theme.bgHover} text-decoration-none`}
            name={t('generic.chat')}/>
        </div>
        <div className='w-100'>
          <SideBarOption
            icon='material-symbols:settings-outline'
            isShown={isShown}
            onClick={() => console.log('dsqdqsd')}
            className={`${theme.link} ${theme.bgHover} text-decoration-none`}
            name={t('generic.settings')}/>
            <hr />  
            <SideBarOptionAccount
              icon='mdi:account-outline'
              isShown={isShown}/>
        </div>
        {user &&
        <>
          {/*TODO UserNavMenu*/}
        </>}
        {/* TODO MainNavMenu */}
        
        {/* TODO SecondaryNavMenu */}
        
      </div>
    </Navbar>
  );
};

export default SideBarNav;