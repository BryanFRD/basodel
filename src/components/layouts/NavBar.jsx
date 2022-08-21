import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import LoginBox from './login/NavBarLoginBox';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { ThemeContext } from '../../context/ThemeContext';

const NavBar = () => {
  const {t} = useTranslation();
  const { theme } = useContext(ThemeContext)
  
  return (
    <Navbar variant={theme.variant} bg={theme.bg} expand='lg' className={`${theme.shadow}`}>
      <Container fluid={true} className='mx-3'>
        <Navbar.Brand as={Link} to='/'>Basodel</Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar'/>
        <Navbar.Collapse id='main-navbar'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/'>{t('generic.home')}</Nav.Link>
            <Nav.Link as={NavLink} to='/about'>{t('generic.about')}</Nav.Link>
          </Nav>
          <Nav className='gap-3 pt-5 pt-lg-0'>
            <LoginBox />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;