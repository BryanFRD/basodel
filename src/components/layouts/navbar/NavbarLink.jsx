import React from 'react';
import GenericLink from '../../generic/link/GenericLink';

const NavbarLink = ({className, to, onClick, children}) => {
  return (
    <GenericLink
    className={`navbar-item ${className}`}
    to={to}
    onClick={onClick}>
      {children}
    </GenericLink>
  );
};

export default NavbarLink;