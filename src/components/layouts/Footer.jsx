import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Container from 'react-bootstrap/esm/Container';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Container fluid className={`p-3 text-center fw-light ${theme.bgClass} ${theme.text}`}>
      <div>© 2022 Copyright:&nbsp;
        <a href='https://bryan-ferrando.fr'
        target='_blank'
        rel='noreferrer'
        className={`fw-normal ${theme.link}`}>
          bryan-ferrando.fr
        </a>
      </div>
    </Container>
  );
};

export default Footer;