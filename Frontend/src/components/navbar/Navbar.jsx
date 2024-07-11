import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, setToken, username } = useContext(StoreContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src='/bitepath_logo_main.png' alt="BitePath" className="logo" /></Link>
      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to='/' onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? 'active' : ''}>Menu</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</a>
      </div>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
          <div className="dot"></div>
        </div>
        {token ? (
          <div className="navbar-user">
            <span className="navbar-username">Hello, {username}</span>
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
      <div className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img src={assets.menu_icon} alt="Menu" />
      </div>
    </div>
  );
};

export default Navbar;
