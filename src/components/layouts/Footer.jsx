import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Container from 'react-bootstrap/esm/Container';

const Footer = ({className}) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Container fluid className={`footer p-3 text-center fw-light h-auto ${theme.bgDarker} ${theme.text} ${className}`}>
      <div>©&nbsp;2022&nbsp;Copyright: &nbsp;
        <a href='https://bryan-ferrando.fr'
        target='_blank'
        rel='noreferrer'
        className={`fw-normal text-nowrap ${theme.link}`}>
          bryan-ferrando.fr
        </a>
      </div>
    </Container>
  );
};

export default Footer;