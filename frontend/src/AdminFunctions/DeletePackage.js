import React, { useEffect, useState } from 'react';
import './adminfunctions.css';
const BASE_URL = process.env.BASE_URL;

const DeleteDish = () => {
  const [dishes, setDishes] = useState([]);
  const token = localStorage.getItem('authToken');
 
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/dishes`, {
          credentials: 'include',
          headers:{
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

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/dishes/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        
        setDishes(dishes.filter(dish => dish.item_id !== itemId));
        alert('Dish deleted successfully!');
      } else {
        alert('Failed to delete dish');
      }
    } catch (error) {
      console.error('Error deleting dish:', error);
      alert('Failed to delete dish');
    }
  };

  return (
    <div className='delete_dish'>
      <h1>Delete Dish</h1>
      <div className='dish_list'>
        {dishes.map((dish, index) => (
          <fieldset key={index}>

            <h3>Dish Name: {dish.name}</h3>
            <h3>Item ID: {dish.item_id}</h3>
            <h3>Rate: {dish.rate}</h3>
            <h3>Quantity: {dish.quantity}</h3>
            <h3>Rating: {dish.rating}</h3>
            <button onClick={() => handleDelete(dish.item_id)}>Delete</button>
          </fieldset>
        ))}
      </div>
    </div>
  );
};

export default DeleteDish;
