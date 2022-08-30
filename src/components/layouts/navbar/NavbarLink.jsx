import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import GenericLink from '../../generic/link/GenericLink';

const NavbarLink = ({className, to, onClick, navbarState, title, children}) => {
  const {theme} = useContext(ThemeContext);
  
  return (
    <GenericLink
    className={`navbar-item d-flex gap-3 w-100 px-3 justify-content-lg-center align-items-lg-center py-2 ${theme.text} ${className}`}
    to={to}
    onClick={onClick}>
      <span className={navbarState?.isExpanded ? 'd-lg-inline w-100 text-lg-end' : 'd-lg-none'}>{title}</span>
      {children}
    </GenericLink>
  );
};

export default NavbarLink;