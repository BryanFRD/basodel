import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomLink = ({to, onClick, className, children}) => {
  return (
    <>
      {to ?
      <>
        <NavLink to={to} className={`custom-link ${className}`} onClick={onClick}>{children}</NavLink>
      </>
      :
      <>
        <span className={`custom-link cursor-pointer pe-auto ${className}`} onClick={onClick}>{children}</span>
      </>
      }
    </>
  );
};

export default CustomLink;