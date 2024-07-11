import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user-profile/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfile();
  }, [token]);

  const totalAmount = getTotalCartAmount();
  const deliveryFee = 6;
  const finalAmount = totalAmount > 0 ? totalAmount + deliveryFee : 0;

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' value={profile.first_name || ''} readOnly />
          <input type="text" placeholder='Last Name' value={profile.last_name || ''} readOnly />
        </div>
        <input type="email" placeholder='Email Address' value={profile.email || ''} readOnly />
        <input type="text" placeholder='Place' value={profile.place || ''} readOnly />
        <div className="multi-fields">
          <input type="text" placeholder='City' value={profile.city || ''} readOnly />
          <input type="text" placeholder='State' value={profile.state || ''} readOnly />
        </div>
        <input type="text" placeholder='Phone' value={profile.phone_no || ''} readOnly />
      </div>
      <div className="place-order-right">
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <p>Total Amount:</p>
            <p>Rs {totalAmount.toFixed(2)}</p>
          </div>
          <div className="summary-item">
            <p>Delivery Fee:</p>
            <p>Rs {totalAmount === 0 ? 0 : deliveryFee}</p>
          </div>
          <div className="summary-item final-amount">
            <p>Final Amount:</p>
            <p>Rs {finalAmount.toFixed(2)}</p>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
