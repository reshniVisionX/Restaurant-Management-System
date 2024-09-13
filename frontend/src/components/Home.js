import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../css/Homepg.css';

const BASE_URL = process.env.BASE_URL;

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const [feedbackList, setFeedbackList] = useState([]);

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/feedback`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error fetching feedback');
      }
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/userData`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const userData = res.data;
        if (userData.email && userData.name) {
          setUser(userData); 
        } else {
          console.log("Not yet logged in", res);
          navigate('/login');  
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          console.log("User is not logged in, redirecting to login.");
        } else {
          console.error('Error fetching user data:', err);
        }
        navigate('/login');  
      });
  }, [navigate, token]);  
  

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/dishes`, {
          method: 'GET', 
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

 

  return (
    <div className='homepg'>
      {user ? (
        <div className='user-details'>
          <h1>We welcome you to the Savory Sanctuary <span className='span-name'>{user.name}</span></h1>
          <h3>@ <span className='span-name'>{user.email}</span></h3>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <img src="/pictures/food.jpg" className='home-pic' alt="pic" />
      <br />
      <div className='home-split'>
        <img src="/pictures/waiter.jpg" alt="homepic" className='split1' />
        <div className='split2'>
          <p>Welcome to Green Haven Bistro, where every dish is a celebration of fresh, sustainable ingredients. Our chefs are dedicated to crafting culinary masterpieces that not only delight the palate but also nourish the soul. From farm-to-table salads to gourmet entrees, each meal is a testament to our commitment to quality and flavor. Join us for a dining experience that blends nature's bounty with culinary artistry, making every visit a memorable feast.</p>
        </div>
      </div>
      <div className='service'>
        <p>Experience the convenience of instant food ordering through our website.</p>
        <p>Save your precious time and indulge in delicious meals without the wait.</p>
        <p>Taste the perfection, and you'll be back for more in an instant.</p>
        <p>Enjoy easy online payments and effortlessly track your previous orders with just a click.</p>
      </div>
      <br />


     <div className='myhotel'>
     <img src="pictures/cafe.jpg" alt="img1" style={{ width: '340px', height: '300px' }} />
      <img src="pictures/tomato.jpg" alt="img1" style={{ width: '450px', height: '300px' }} />
      <img src="pictures/toy.jpg" alt="img1" style={{ width: '450px', height: '300px' }} />
    </div>

    <div className='ourCustomer'>
      <h1 className='feedTitle'>Our Customers' Feedback</h1>
      <div className='scroll-container'>
        <button className='arrow left' onClick={() => scroll('left')}>&lt;</button>
        <div className='scroll-review' ref={scrollContainerRef}>
          {feedbackList.map((feed, index) => (
            <div className='feedback-item' key={index}>
              <h3>{feed.name}</h3>
              <p>{feed.message}</p>
              <b><strong>Date:</strong> {new Date(feed.date).toLocaleDateString()}</b>
            </div>
          ))}
        </div>
        <button className='arrow right' onClick={() => scroll('right')}>&gt;</button>
      </div>
    </div>
    <img src='pictures/cup.jpg' className="lastpic" alt='logo' />
</div>
  );
};

export default Home;
