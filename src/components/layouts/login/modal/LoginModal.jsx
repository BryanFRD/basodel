import React, { useContext } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import { ThemeContext } from '../../../../context/ThemeContext';
import { UserContext } from '../../../../context/UserContext';
import { useTranslation } from 'react-i18next';
import Tabs from 'react-bootstrap/esm/Tabs';
import Tab from 'react-bootstrap/esm/Tab';
import SignUpModalTab from './SignUpModalTab';
import LogInModalTab from './LogInModalTab';
import CustomLink from '../../../generic/CustomLink';
import { Icon } from '@iconify/react';

const LoginModal = ({show, setShow}) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  return (
    <Modal show={show} size='lg' keyboard centered className={`border-0 ${theme.modal}`} onHide={() => setShow(false)}>
      <Modal.Header className='border-0 p-0'>
        <CustomLink className='ms-auto fs-3 px-3 py-1' onClick={() => setShow(false)}><Icon icon='ion:close-sharp'/></CustomLink>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey={show} justify fill className='flex-row'>
          <Tab eventKey='login' title={t('generic.login')}>
            <LogInModalTab/>
          </Tab>
          <Tab eventKey='signup' title={t('generic.signup')}>
            <SignUpModalTab/>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;