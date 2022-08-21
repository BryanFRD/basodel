import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container'
import { ThemeContext } from '../context/ThemeContext';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Container fluid>
      Home Screen
    </Container>
  );
};

export default HomeScreen;