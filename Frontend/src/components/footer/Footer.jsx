import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';


const Footer = () => {
  return (
    <footer className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-section company-info">
          <img src='/bitepath_logo_main.png' alt="BitePath Logo" className="footer-logo" />
          
          <p>Your gateway to delicious meals delivered fast and fresh. Discover your favorites and explore new delights with BitePath.</p>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: support@bitepath.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Foodie Lane, Gourmet City, FL 45678</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BitePath. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
