import React, { useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';
import { ThemeContext } from '../context/ThemeContext';
import SideBarNav from '../components/layouts/nav/SideBarNav';
import Container from 'react-bootstrap/esm/Container';

const BaseScreen = () => {
  const { theme } = useContext(ThemeContext);
  const mainRef = useRef(), footerRef = useRef();
  
  return (
    <>
      <header>
        {/* <NavBar /> */}
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