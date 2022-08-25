import React from 'react';
import { Icon } from '@iconify/react';
import CustomLink from '../../generic/CustomLink';

const SideBarOption = ({icon, name, to, isShown, onClick, className, asNavLink}) => {
  return (
    <CustomLink to={to}
    className={`sidebaroption d-flex flex-column justify-content-center align-items-center py-3 ${className}`}
    onClick={onClick}>
      {
        <div className={`d-flex justify-content-end align-items-center gap-2 w-100 user-select-none`}>
          <span className={!isShown ? 'd-none' : ''}>{name}</span>
          <Icon icon={icon} fontSize='2.5em' className='pe-none'/>
        </div>
      }
    </CustomLink>
  );
};

export default SideBarOption;