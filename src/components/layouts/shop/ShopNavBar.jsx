import React from 'react';
import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RiSearchLine } from 'react-icons/ri';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';

const ShopNavBar = ({search, setSearch}) => {
  const {theme} = useContext(ThemeContext);
  const {user} = useContext(UserContext);
  const {t} = useTranslation();
  
  return (
    <div
      className={`position-sticky sticky-top d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 w-100 p-3 ${theme.bgClass} ${theme.shadow}`}>
      <div className='d-flex gap-5 w-auto'>
        {user &&
          <div className='d-flex flex-column flex-lg-row gap-3 align-items-center text-nowrap'>
            <div className='d-flex gap-3 gap-lg-5 align-items-center'>
              <h4 className='m-0'>{user.username}</h4>
              <span>{`${t('generic.level')} ${user.getLevel()}`}</span>
            </div>
            <div className='d-flex gap-3 align-items-center w-100'>
              <span className='d-flex justify-content-between me-1'>
                <span className='d-flex gap-1'>
                  <img src='https://bryan-ferrando.fr/img/material/material_65.png' alt='silver coin' className='pixelated-image'/>
                  <span className={`align-bottom`}>
                    {user.silver}
                  </span>
                </span>
              </span>
              <span className='d-flex justify-content-between me-1'>
                <span className='d-flex gap-1'>
                  <img src='https://bryan-ferrando.fr/img/material/material_71.png' alt='silver coin' className='pixelated-image'/>
                  <span className={`align-bottom`}>
                    {user.gold}
                  </span>
                </span>
              </span>
            </div>
          </div>
        }
      </div>
      <div className='d-flex m-3 m-lg-0'>
        <div className={`${theme.bgClassLighter} rounded d-flex align-items-center w-100`}>
          <Form.Control
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('generic.search')}
            className={`bg-transparent ${theme.text} border-0 outline-0 shadow-none w-100 h-100`}>
          </Form.Control>
          <RiSearchLine className='bg-transparent me-2' size={25}/>
        </div>
      </div>
    </div>
  );
};

export default ShopNavBar;