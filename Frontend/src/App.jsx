import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Footer from './components/footer/Footer'
import LoginPopUp from './components/loginPopUp/LoginPopUp'
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { setToken } = useContext(StoreContext);

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} setToken={setToken} /> : <></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin}></Navbar>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/order' element={<PlaceOrder />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
