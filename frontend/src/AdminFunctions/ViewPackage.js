import React, { useEffect, useState } from 'react';
import './adminfunctions.css';
<<<<<<< HEAD
import './view.css'
=======
>>>>>>> origin/main
const BASE_URL = 'http://localhost:4000';

const ViewPackage = () => {
  const [dishes, setDishes] = useState([]);
<<<<<<< HEAD
  const token = localStorage.getItem('authToken');
=======
>>>>>>> origin/main

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/dishes`, {
<<<<<<< HEAD
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`
          }
=======
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
  const renderDish = (dish) => {
    if (!dish.category) return null;

    return (
      <div key={dish.item_id} className={`view-dish-item view-${dish.category.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="view-dish-image">
          <img className="view-image" src={`images/${dish.image}`} alt={dish.name} />
        </div>
        <div className="view-dish-details">
          <p><span className="view-dish-key">Dish Name:</span> <span className="view-dish-value">{dish.name}</span></p>
          <p><span className="view-dish-key">Item ID:</span> <span className="view-dish-value">{dish.item_id}</span></p>
          <p><span className="view-dish-key">Rate:</span> <span className="view-dish-value">₹{dish.rate}</span></p>
          <p><span className="view-dish-key">Quantity:</span> <span className="view-dish-value">{dish.quantity}</span></p>
          <p><span className="view-dish-key">Rating:</span> <span className="view-dish-value">{dish.rating}</span></p>
        </div>
      </div>
    );
  };

  return (
    <div className='view-dish'>
      <h1>View All Dishes</h1>
      <div className='view-dish-list'>
        {dishes.map(renderDish)}
=======
  return (
    <div className='view_dish'>
      <h1>View All Dishes</h1>
      <div className='dish_list'>
        {dishes.map((dish, index) => (
          <fieldset key={index}>
            {dish.category === 'Appetizers' && (
              <div className='dish1'>
                <legend>Appetizers</legend>
                <img src={`images/${dish.image}`} alt={dish.name} />
                <h3>Dish Name: {dish.name}</h3>
                <h3>Item ID: {dish.item_id}</h3>
                <h3>Rate: {dish.rate}</h3>
                <h3>Quantity: {dish.quantity}</h3>
                <h3>Rating: {dish.rating}</h3>
              </div>
            )}

            {dish.category === 'Main Courses' && (
              <div className='dish2'>
                <legend>Main Courses</legend>
                <img src={`images/${dish.image}`} alt={dish.name} />
                <h3>Dish Name: {dish.name}</h3>
                <h3>Item ID: {dish.item_id}</h3>
                <h3>Rate: {dish.rate}</h3>
                <h3>Quantity: {dish.quantity}</h3>
                <h3>Rating: {dish.rating}</h3>
              </div>
            )}

            {dish.category === 'Snacks' && (
              <div className='dish3'>
                <legend>Snacks</legend>
                <img src={`images/${dish.image}`} alt={dish.name} />
                <h3>Dish Name: {dish.name}</h3>
                <h3>Item ID: {dish.item_id}</h3>
                <h3>Rate: {dish.rate}</h3>
                <h3>Quantity: {dish.quantity}</h3>
                <h3>Rating: {dish.rating}</h3>
              </div>
            )}

            {dish.category === 'Desserts' && (
              <div className='dish4'>
                <legend>Desserts</legend>
                <img src={`images/${dish.image}`} alt={dish.name} />
                <h3>Dish Name: {dish.name}</h3>
                <h3>Item ID: {dish.item_id}</h3>
                <h3>Rate: {dish.rate}</h3>
                <h3>Quantity: {dish.quantity}</h3>
                <h3>Rating: {dish.rating}</h3>
              </div>
            )}

            {dish.category === 'Beverages' && (
              <div className='dish5'>
                <legend>Beverages</legend>
                <img src={`images/${dish.image}`} alt={dish.name} />
                <h3>Dish Name: {dish.name}</h3>
                <h3>Item ID: {dish.item_id}</h3>
                <h3>Rate: {dish.rate}</h3>
                <h3>Quantity: {dish.quantity}</h3>
                <h3>Rating: {dish.rating}</h3>
              </div>
            )}

            {dish.category === 'Grilled Items' && (
              <div className='dish6'>
                <legend>Grilled Items</legend>
                <img src={`images/${dish.image}`} alt={dish.name} />
                <h3>Dish Name: {dish.name}</h3>
                <h3>Item ID: {dish.item_id}</h3>
                <h3>Rate: {dish.rate}</h3>
                <h3>Quantity: {dish.quantity}</h3>
                <h3>Rating: {dish.rating}</h3>
              </div>
            )}
          </fieldset>
        ))}
>>>>>>> origin/main
      </div>
    </div>
  );
};

export default ViewPackage;
