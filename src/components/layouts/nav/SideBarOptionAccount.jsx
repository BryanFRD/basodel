import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';

const SideBarOptionAccount = ({isShown, icon, className}) => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  return (
    <div className={`sidebar-option-account d-flex justify-content-end align-items-center gap-2 w-100`}>
      <div className={`d-flex flex-column justify-content-around align-items-center h-100 w-50 ${!isShown ? 'd-none' : ''}`}>
        dsqdqs
        <div>dqsdqs</div>
      </div>
      <Link to={user ? '/account' : ''} className={`${theme.link}`}>
        <Icon icon={icon} fontSize='2.5em' className='pe-none'/>
      </Link>
    </div>
  );
};

export default SideBarOptionAccount;