import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import MainNavbar from '../components/layouts/navbar/MainNavbar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { ThemeContext } from '../context/ThemeContext';
import CustomToast from '../components/layouts/toast/CustomToast';

const BaseScreen = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      <Row className={`g-0 ${theme.bgClass} ${theme.text}`}>
        <Col className='order-lg-1' lg='auto'>
          <header>
            <MainNavbar />
          </header>
        </Col>
        <Col>
          <div id='mainDiv'>
            <main>
              <Outlet />
            </main>
            <footer>
              <Footer/>
            </footer>
            <CustomToast />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BaseScreen;