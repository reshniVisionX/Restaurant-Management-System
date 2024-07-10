import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import './css/login.css';

const BASE_URL = 'http://localhost:4000';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Login successful') {
          const token = data.token;
          localStorage.setItem('authToken', token);
          console.log('Login successful');
          if (data.isAdmin) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          console.log("Invalid credentials");
          setErrorMessage(data.message);
        }
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Failed to login');
      });
  };

  return (
    <div className='login-group'>
      <div className='form-login'>
      <form onSubmit={handleSubmit}>
      <h3 className='login-title'>Login</h3>
       <br/>
      <div className="email-login">
     
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={values.email}
          onChange={handleInput}
        />
      </div>
      <br/>
      <div className="password-login">
        
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          value={values.password}
          onChange={handleInput}
        />
      </div>
      <br/>
      <div className="checkBox">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="remember-me" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <br/>
      <div className="submit-btn">
        <button type="submit" className="btn-login">
          Submit
        </button>
        <br/>
      </div>
      {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        <br/>
      
    </form>
      </div>
      <div className='picture-signup'>
       <div class="centered-content">
       <p>Havent Registered Yet..!</p>
       <button className='btn-login' onClick={()=>navigate('/register')}>SignUp</button>
     </div>
    </div>
    </div>
   
  );
};

export default Login;
