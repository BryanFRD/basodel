import React, { useMemo } from 'react';
import { useContext } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { RiCloseFill } from 'react-icons/ri';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import { DataManager } from '../../../helpers/DataManager.helper';
import GenericLink from '../../generic/link/GenericLink';

const ShopArticleModal = ({setModal, modal}) => {
  const {theme} = useContext(ThemeContext);
  const {user, reloadUser} = useContext(UserContext);
  const {t} = useTranslation(['translation', 'items']);
  
  const money = useMemo(() => {
    const requiredSilver = Math.floor(modal.article?.silver * ((100 - modal.article?.promo) / 100));
    const requiredGold = Math.floor(modal.article?.gold * ((100 - modal.article?.promo) / 100));
    
    const remainingSilver = user?.silver - requiredSilver;
    const remainingGold = user?.gold - requiredGold;
    
    const canBeBought = !(remainingSilver < 0 || remainingGold < 0);
    
    return {requiredSilver, requiredGold, remainingSilver, remainingGold, canBeBought}
  }, [user, modal]);
  
  const handleBuy = () => {
    if(!money.canBeBought)
      return;
    
    toast.promise(DataManager.create('UserArticle', {
        model: {userAccountId: user.id, articleId: modal.article.id}}), 
        {
          loading: t('confirmation.shop.loading'),
          success: t('confirmation.shop.success'),
          error: t('confirmation.shop.error'),
        }).finally(reloadUser);
    
    setModal(prevValue => ({...prevValue, show: false}));
  }
  
  return (
    <Modal show={modal.show} size='lg' keyboard centered className={`border-0 ${theme.modal}`} onHide={() => setModal((prevValue) => ({...prevValue, show: false}))}>
      <Modal.Header className='border-0 p-0 align-items-baseline'>
        <Modal.Title className='ms-3'>{`${t(modal.article?.title, {ns: 'items'})} :`}</Modal.Title>
        <GenericLink
          className='ms-auto fs-3 px-3 py-1'
          onClick={() => setModal((prevValue) => ({...prevValue, show: false}))}>
            <RiCloseFill />
        </GenericLink>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column flex-lg-row gap-5 p-lg-3'>
        <img src={modal.article?.image?.src} alt={modal.article?.image?.alt} className='pixelated-image w-50 align-self-center'></img>
        <div className={`d-flex flex-column justify-content-between p-3 w-100`}>
          <div className='d-flex flex-column'>
            <div className='text-center d-flex flex-column gap-3'>
              <Row>
                <Col xs={8} className='align-self-center text-start'>
                  <span>{t('shop.purchase.youPay')}</span>
                </Col>
                <Col className='align-self-center text-start'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex gap-1'>
                      <img src='https://bryan-ferrando.fr/img/material/material_65.png' alt='Silver coin' className='pixelated-image'/>
                      <span>{money.requiredSilver}</span>
                    </div>
                    <div className='d-flex gap-1'>
                      <img src='https://bryan-ferrando.fr/img/material/material_71.png' alt='Gold coin' className='pixelated-image'/>
                      <span>{money.requiredGold}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={8} className='align-self-center text-start'>
                  <span className='align-start'>{`${t('shop.purchase.youHave')} :`}</span>
                </Col>
                <Col className='align-self-center text-start'>
                  <div className='d-flex flex-column'>
                    <div className={`d-flex gap-1 ${money.remainingSilver < 0 ? theme.textDanger : theme.textSuccess}`}>
                      <img src='https://bryan-ferrando.fr/img/material/material_65.png' alt='Silver coin' className='pixelated-image'/>
                      <span>{money.remainingSilver}</span>
                    </div>
                    <div className={`d-flex gap-1 ${money.remainingGold < 0 ? theme.textDanger : theme.textSuccess}`}>
                      <img src='https://bryan-ferrando.fr/img/material/material_71.png' alt='Gold coin' className='pixelated-image'/>
                      <span>{money.remainingGold}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            {!money.canBeBought &&
              <span className={`${theme.textDanger}`}>{t('shop.purchase.notEnoughMoney')}</span>
            }
            <div className='d-flex justify-content-between justify-content-lg-end gap-3 mt-3'>
              <Button
                variant={theme.bg}
                className={`${theme.textDanger}`}
                onClick={() => setModal(prevValue => ({...prevValue, show: false}))}>
                  {t('shop.cancel')}
              </Button>
              <Button variant='success' onClick={handleBuy} disabled={!money.canBeBought}>{t('shop.buy')}</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShopArticleModal;