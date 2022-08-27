import React, { useContext } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import { ThemeContext } from '../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Tabs from 'react-bootstrap/esm/Tabs';
import Tab from 'react-bootstrap/esm/Tab';
import SignUpModalTab from './SignUpModalTab';
import LogInModalTab from './LogInModalTab';
import { RiCloseFill } from 'react-icons/ri';
import GenericLink from '../../../generic/link/GenericLink';

const LoginModal = ({show, setShow}) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  return (
    <Modal show={show} size='lg' keyboard centered className={`border-0 ${theme.modal}`} onHide={() => setShow(false)}>
      <Modal.Header className='border-0 p-0'>
        <GenericLink className='ms-auto fs-3 px-3 py-1' onClick={() => setShow(false)}><RiCloseFill /></GenericLink>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey={show} justify fill className={`flex-row text.link`}>
          <Tab eventKey='login' title={t('generic.login')}>
            <LogInModalTab setShow={setShow}/>
          </Tab>
          <Tab eventKey='signup' title={t('generic.signup')}>
            <SignUpModalTab setShow={setShow}/>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;