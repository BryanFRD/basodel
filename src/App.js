import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './i18n'
import BaseScreen from './screens/BaseScreen';
import LoadingSpinner from './components/layouts/LoadingSpinner';
import NotFoundScreen from './screens/NotFoundScreen';
import { initThemes } from './context/ThemeContext';

const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const AboutScreen = React.lazy(() => import('./screens/AboutScreen'));

function App() {
  initThemes();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseScreen />}>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <HomeScreen />
            </Suspense>
          } />
          
          <Route path='/about' element={
            <Suspense fallback={<LoadingSpinner />}>
              <AboutScreen />
            </Suspense>
          } />
          
          <Route path='*' element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFoundScreen />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
