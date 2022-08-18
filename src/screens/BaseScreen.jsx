import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';
import { ThemeContext } from '../context/ThemeContext';

const BaseScreen = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className={`${theme.bgClass} ${theme.text}`}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default BaseScreen;