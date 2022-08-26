import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container'
import { ThemeContext } from '../context/ThemeContext';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Container fluid className={`${theme.bgClass} ${theme.text}`}>
      Home Screen
    </Container>
  );
};

export default HomeScreen;