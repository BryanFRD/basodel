import React, { useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import { ThemeContext } from '../context/ThemeContext';
import Container from 'react-bootstrap/esm/Container';
import SideBarNav from '../components/layouts/nav/SideBarNav';

const BaseScreen = () => {
  const { theme } = useContext(ThemeContext);
  const mainRef = useRef(), footerRef = useRef();
  
  return (
    <>
      <header>
        <SideBarNav mainRef={mainRef} footerRef={footerRef} />
      </header>
      <main ref={mainRef} className={`${theme.bgClass} ${theme.text}`}>
        <Container fluid>
          <Outlet />
        </Container>
      </main>
      <footer ref={footerRef}>
        <Footer />
      </footer>
    </>
  );
};

export default BaseScreen;