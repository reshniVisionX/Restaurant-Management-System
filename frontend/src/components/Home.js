import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../css/Homepg.css';

const BASE_URL = 'http://localhost:4000';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
<<<<<<< HEAD
  const token = localStorage.getItem('authToken');
  useEffect(() => {
  
    axios.get(`${BASE_URL}/userData`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
=======

  useEffect(() => {
    axios.get(`${BASE_URL}/userData`, { withCredentials: true })
>>>>>>> origin/main
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
        console.error('Error fetching user data:', err);
        navigate('/login');
      });
  }, [navigate]);

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch(`${BASE_URL}/api/dishes`, {
          method: 'GET', 
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`
          }
=======
        const response = await fetch(`${BASE_URL}/admin/dishes`, {
          credentials: 'include'
>>>>>>> origin/main
        });
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

<<<<<<< HEAD
 
=======
  const groupedDishes = dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {});

  const categories = [
    'Appetizers',
    'Main Courses',
    'Snacks',
    'Desserts',
    'Beverages',
    'Grilled Items'
  ];
>>>>>>> origin/main

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

      <h1 className='dishes-list'>View All Dishes</h1>
      <div className='dish_list'>
<<<<<<< HEAD
 
    <div className='home-dish' >
      {dishes.map((dish, index) => (
        <div className='dish-item' key={dish.item_id}>
          <div className='dish-grp'>
            <img src={`images/${dish.image}`} alt={dish.name} className='dish-img' />
          </div>
        </div>
      ))}
    </div>
 
  <br />
</div>
</div>
=======
        {categories.map(category => (
          <fieldset key={category}>
            <legend className='leg'>{category}</legend>
            {groupedDishes[category] && groupedDishes[category].map((dish, index) => (
              <div className={`dish${index + 1}`} key={dish.item_id} >
                <div className='dish-grp'>
                <img src={`images/${dish.image}`} alt={dish.name} className='dish-img' />
                <div className='desc'>
                <h3 className='dish-name'> {dish.name}</h3>
                <h3 className='dish-rate'> ₹ {dish.rate}</h3>
                <h3 className='dish-rating'><img src = "https://icon2.cleanpng.com/20180422/kew/kisspng-star-golden-stars-5add5465f24541.9545710215244545019924.jpg" alt="star" className='rating-pic' /> {dish.rating}</h3>
                </div>
              </div>
              </div> 
            ))}
           
          </fieldset> 
        ))}<br/>
      </div>
    </div>
>>>>>>> origin/main
  );
};

export default Home;
