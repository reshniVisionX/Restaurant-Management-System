import React,{useEffect,useState} from 'react'
import '../css/navbar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true; 

const Navbar = () => {
 
  axios.defaults.baseURL =   process.env.REACT_APP_BASE_URL;
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  axios.defaults.withCredentials = true;

useEffect(()=>{
axios.get('/', {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => {
  console.log(res);
  if (res.data.valid) {
    setName(res.data.name);
  } else {
    navigate('/login');
  }
})
.catch(error => {
  console.error('Error:', error);
  
});
},[]);

  const handleLogout = () => {
    
    axios.post('/logout', {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data.success) {
        setName('');
        navigate('/login');
        alert('You are logged out successfully...');
      } else {
        console.log('Logout failed');
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
  
  return (
    <section className='navbar'>
    <div className='nav-section1'>
    <img src='pictures/logos.jpg' className="logo" alt='logo' />
    <div className='nav-page'>Savor Green</div>
    </div>
    <div className='nav-section2'>
    
        <li><a href='/'>Dishes</a></li>
        <li><a href='/order'>Orders</a></li>
        <li><a href='/history'>History</a></li>
        <li><a href='/contact'>Contact</a></li>
        <button type="button" onClick={() => navigate('/login')} className='navbar-btn'>Login</button>
        <button type="button" onClick={() => handleLogout()} className='navbar-btn'>Logout</button>
   
    
     </div>
</section>

  )
}

export default Navbar;