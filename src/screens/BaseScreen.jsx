import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';

const BaseScreen = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default BaseScreen;