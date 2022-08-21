import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const SideBarOption = ({icon, name, to, isShown, onClick, className}) => {
  return (
    <Link to={to ?? ''}
    className={`sidebaroption d-flex flex-column justify-content-center align-items-center pt-3 ${isShown ? 'mb-3' : 'pb-3'} ${className}`}
    onClick={onClick}>
      {
        <div className={`d-flex justify-content-end align-items-center gap-3 w-100`}>
          <span className={!isShown && 'd-none'}>{name}</span>
          <Icon icon={icon} fontSize='2.5em' className='pe-none'/>
        </div>
      }
      <span className={isShown && 'opacity-0'}>{name}</span>
    </Link>
  );
};

export default SideBarOption;