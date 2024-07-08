import React, { useState } from 'react';
import './css/signup.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000'; // Set base URL for Axios requests
axios.defaults.withCredentials = true; // Enable sending cookies with cross-origin requests


const Register = () => {
    const Navigate = useNavigate();
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('/registers', values)
    .then((res) => {
        if(res.data.Status==="success"){
          console.log("Registration success");
<<<<<<< HEAD
          console.log(res.data.token);
=======
>>>>>>> origin/main
             Navigate('/login');
        }else{
             alert("Error : in navigting to login page")
        }
    })
    .catch((err) => {
        console.error('Error:', err);
    });

    }

  return (
    <div className='signup-container'>
       <div className='signup-img'>
       <div className='signup-content'>
        <br/>
        <h2>Welcome you in directly if you have already regitered</h2>
        <Link to = '/login' className="forgot-password">
          Already registered <a href="/sign-in">sign in?</a>

        </Link><br/>
        <button type="submit" onClick={()=>Navigate('/login')} className="signin-btn">
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
            onChange={e=>setValues({...values,name: e.target.value})}
          />
        </div>
<br/>

        <div className="signup-email">
         
          <input
            type="email" name='email'
            className="form-control"
            placeholder="Enter email"
            onChange={e=>setValues({...values,email:e.target.value})}
          />
        </div>
<br/>
        <div className="signup-password">
        
          <input
            type="password" name='password'
            className="form-control"
            placeholder="Enter password"
            onChange={e=>setValues({...values,password:e.target.value})}
          />
        </div>
<br/>
<div className="signup-button">
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </div>
        
      </form>
      
      </div>
     
    </div>
   

   
  )
}

export default Register