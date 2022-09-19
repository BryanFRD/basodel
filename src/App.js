import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import './i18n';
import NoFooterBaseScreen from './screens/NoFooterBaseScreen';
import BaseScreen from './screens/BaseScreen';
import LoadingSpinner from './components/layouts/LoadingSpinner';
import NotFoundScreen from './screens/NotFoundScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const ShopScreen = React.lazy(() => import('./screens/ShopScreen'));
const AccountScreen = React.lazy(() => import('./screens/AccountScreen'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NoFooterBaseScreen />}>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <HomeScreen />
            </Suspense>
          } />
        </Route>
        <Route path='/' element={<BaseScreen />}>
          <Route path='/shop' element={
            <Suspense fallback={<LoadingSpinner />}>
              <ShopScreen />
            </Suspense>
          } />
          
          <Route path='/account' element={
            <Suspense fallback={<LoadingSpinner />}>
              <AccountScreen />
            </Suspense>
          }/>
          
          <Route path='/confirmation:confirmed' element={
            <Suspense fallback={<LoadingSpinner />}>
              <ConfirmationScreen />
            </Suspense>
          }/>
          
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
