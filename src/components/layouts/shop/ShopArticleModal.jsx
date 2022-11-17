import React from 'react';
import { useContext } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RiCloseFill } from 'react-icons/ri';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import GenericLink from '../../generic/link/GenericLink';

const ShopArticleModal = ({setModal, modal}) => {
  const {theme} = useContext(ThemeContext);
  const {user} = useContext(UserContext);
  const {t} = useTranslation(['translation', 'items']);
  
  return (
    <Modal show={modal.show} size='lg' keyboard centered className={`border-0 ${theme.modal}`} onHide={() => setModal((prevValue) => ({...prevValue, show: false}))}>
      <Modal.Header className='border-0 p-0 align-items-baseline'>
        <Modal.Title className='ms-3'>{t(modal.article?.title, {ns: 'items'})}</Modal.Title>
        <GenericLink
          className='ms-auto fs-3 px-3 py-1'
          onClick={() => setModal((prevValue) => ({...prevValue, show: false}))}>
            <RiCloseFill />
        </GenericLink>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column flex-lg-row gap-5 p-lg-3'>
        <img src={modal.article?.image?.src} alt={modal.article?.image?.alt} className='pixelated-image w-50 align-self-center'></img>
        <div className={`d-flex flex-column justify-content-between gap-3 p-3 w-100`}>
          <div className='d-flex flex-column'>
            <div className='text-center d-flex flex-column gap-3'>
              <Row>
                <Col xs={8} className='align-self-center text-start'>
                  <span>Vous payerez:</span>
                </Col>
                <Col className='align-self-center text-start'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex gap-1'>
                      <img src='https://bryan-ferrando.fr/img/material/material_65.png' alt='Silver coin' className='pixelated-image'/>
                      <span>999</span>
                    </div>
                    <div className='d-flex gap-1'>
                      <img src='https://bryan-ferrando.fr/img/material/material_71.png' alt='Gold coin' className='pixelated-image'/>
                      <span>99</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={8} className='align-self-center text-start'>
                  <span className='align-start'>Il vous restera:</span>
                </Col>
                <Col className='align-self-center text-start'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex gap-1'>
                      <img src='https://bryan-ferrando.fr/img/material/material_65.png' alt='Silver coin' className='pixelated-image'/>
                      <span>99</span>
                    </div>
                    <div className='d-flex gap-1'>
                      <img src='https://bryan-ferrando.fr/img/material/material_71.png' alt='Gold coin' className='pixelated-image'/>
                      <span>99</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <hr />
            <div>
              <Row>
                <Col xs={8} className='align-self-center text-start'>
                  <span className={theme.textSuccess}>Il vous restera:</span>
                </Col>
                <Col className='align-self-center text-start'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex gap-1'>
                      <img src='https://bryan-ferrando.fr/img/material/material_65.png' alt='Silver coin' className='pixelated-image'/>
                      <span>999</span>
                    </div>
                    <div className='d-flex gap-1'>
                      <img src='https://bryan-ferrando.fr/img/material/material_71.png' alt='Gold coin' className='pixelated-image'/>
                      <span>99</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <span className={`${theme.textDanger}`}>Vous n'avez pas assez l'argent suffisant</span>
            </div>
            <div className='d-flex justify-content-between justify-content-lg-end gap-3 mt-5'>
              <Button variant={theme.bg} className={`${theme.textDanger}`} onClick={() => setModal(prevValue => ({...prevValue, show: false}))}>
              {t('shop.cancel')}</Button>
              <Button variant='success'>{t('shop.buy')}</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShopArticleModal;