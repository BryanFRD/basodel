import React from 'react';
import { useTranslation } from 'react-i18next';
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const {t} = useTranslation();
  
  return (
    <MDBNavbar>
      <MDBContainer fluid>
        <MDBNavbarBrand as={'button'} href='/'>Basodel</MDBNavbarBrand>
      </MDBContainer>
    </MDBNavbar>
    // <Navbar bg='dark' variant='dark' expand='lg'>
    //   <Container fluid={true} className='mx-3'>
    //     <Navbar.Brand as={Link} to='/'>Basodel</Navbar.Brand>
    //     <Navbar.Toggle aria-controls='primary-navbar'/>
    //     <Navbar.Collapse id='primary-navbar'>
    //       <Nav className='me-auto'>
    //         <Nav.Link as={NavLink} to='/'>{t('navbar.home')}</Nav.Link>
    //         <Nav.Link as={NavLink} to='/about'>{t('navbar.about')}</Nav.Link>
    //       </Nav>
    //       <Nav className='gap-3 pt-5 pt-lg-0'>
    //         <LoginBox />
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default NavBar;