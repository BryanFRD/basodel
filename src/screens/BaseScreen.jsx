import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import MainNavbar from '../components/layouts/navbar/MainNavbar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const BaseScreen = () => {
  return (
    <>
      <Row className='g-0'>
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
          </div>
        </Col>
      </Row>
      {/* <header>
        <SideBarNav mainRef={mainRef} footerRef={footerRef} />
      </header>
      <main ref={mainRef} className={`${theme.bgClass} ${theme.text}`}>
        <Outlet />
      </main>
      <footer ref={footerRef}>
        <Footer />
      </footer> */}
    </>
  );
};

export default BaseScreen;