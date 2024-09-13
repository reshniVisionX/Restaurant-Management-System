import React, { useState } from 'react';
import './css/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL =  process.env.BASE_URL;
axios.defaults.withCredentials = true; 

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/registers', values)
      .then((res) => {
        if (res.data.Status === "success") {
          console.log("Registration success");
          console.log(res.data.token);
          navigate('/login');
        } else {
          alert("Error: navigating to login page");
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.error);
        } else if (err.response && err.response.data && err.response.data.error) {
          setErrors([err.response.data.error]);
        } else {
          setErrors(['Failed to register']);
        }
        console.log(err.message)
      });
  };

  return (
    <div className='signup-container'>
      <div className='signup-img'>
        <div className='signup-content'>
          <br />
          <h2>Welcome you in directly if you have already registered</h2>
          <Link to='/login' className="forgot-password">
            Already registered <a href="/sign-in">sign in?</a>
          </Link><br />
          <button type="submit" onClick={() => navigate('/login')} className="signin-btn">
            Sign In
          </button>
        </div>
      </div>
      <div className='form-signup'>
        <form onSubmit={handleSubmit}>
          <h3 className='signup-title'>Sign Up</h3>

          <div className="signup-name">
            <input 
              type="text" name="name"
              className="form-control"
              placeholder="First name"
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <br />

          <div className="signup-email">
            <input
              type="email" name='email'
              className="form-control"
              placeholder="Enter email"
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <br />

          <div className="signup-password">
            <input
              type="password" name='password'
              className="form-control"
              placeholder="Enter password"
              onChange={e => setValues({ ...values, password: e.target.value })}
            />
          </div>
          <br />

          <div className="signup-button">
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </div>

          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <div key={index} className="error-message">
                  {error}
                </div>
              ))}
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default Register;
