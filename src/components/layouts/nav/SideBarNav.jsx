import React, { useContext, useEffect, useState, useRef } from 'react';
import './SideBarNav.scss';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import SideBarOption from './SideBarOption';
import { useTranslation } from 'react-i18next';

const SideBarNav = ({mainRef, footerRef}) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const sideBarNav = useRef();
  
  const [navWidth, setNavWidth] = useState('0%');
  const [isShown, setIsShown] = useState(false);
  
  useEffect(() => {
    sideBarNav.current.style.width = `calc(75px + ${navWidth})`
    mainRef.current.style.marginRight = `calc(75px + ${navWidth})`;
    footerRef.current.style.marginRight = `calc(75px + ${navWidth})`;
  }, [mainRef, footerRef, navWidth]);
  
  const handleToggle = () => {
    setIsShown(!isShown);
    setNavWidth(!isShown ? '6%' : '0%');
  }
  
  return (
    <div id='sideBarNav' ref={sideBarNav} className={`d-none d-lg-block ${theme.bgClass} ${theme.text} ${theme.shadow}`}>
      <div className='nav-menu'>
        <SideBarOption icon={isShown ? 'ion:close-sharp' : 'charm:menu-hamburger'}
          onClick={handleToggle}
          className={`my-1 mb-3 ${theme.link}`}/>
        <SideBarOption icon='material-symbols:home-outline-rounded'
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
        {user &&
        <>
          {/*TODO UserNavMenu*/}
        </>}
        {/* TODO MainNavMenu */}
        
        {/* TODO SecondaryNavMenu */}
        
      </div>
    </div>
  );
};

export default SideBarNav;