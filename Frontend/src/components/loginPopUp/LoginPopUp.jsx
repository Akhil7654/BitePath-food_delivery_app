import React, { useContext, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const LoginPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState('Login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [place, setPlace] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const { setToken } = useContext(StoreContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (currentState === 'Signup') {
        const response = await axios.post('http://localhost:8000/api/register/', {
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          place,
          city,
          state,
          phone_no: phoneNo
        });
        alert('Registration successful! Please login.');
        setCurrentState('Login');
        setUsername('');
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setPlace('');
        setCity('');
        setState('');
        setPhoneNo('');
      } else {
        const response = await axios.post('http://localhost:8000/api/login/', {
          username,
          password
        });
        setToken(response.data.token);
        setShowLogin(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Authentication error');
      }
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        
        <div className="login-popup-inputs">
          <input type="text" placeholder='Your Username' required value={username} onChange={(e) => setUsername(e.target.value)} />
          {currentState === 'Signup' && 
            <div className="two-column-grid">
              <input type="email" placeholder='Your Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="text" placeholder='First Name' required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder='Last Name' required value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <input type="text" placeholder='Place' required value={place} onChange={(e) => setPlace(e.target.value)} />
              <input type="text" placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)} />
              <input type="text" placeholder='State' required value={state} onChange={(e) => setState(e.target.value)} />
              <input type="text" placeholder='Phone' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            </div>
          }
          <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <div className="login-popup-error">{error}</div>}
        <button type="submit" className="login-popup-button">{currentState === "Signup" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
        </div>
        {currentState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrentState('Signup')}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
