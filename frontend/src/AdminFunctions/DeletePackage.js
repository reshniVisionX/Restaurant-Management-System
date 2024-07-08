import React, { useEffect, useState } from 'react';
import './adminfunctions.css';

const DeleteDish = () => {
  const [dishes, setDishes] = useState([]);
<<<<<<< HEAD
  const token = localStorage.getItem('authToken');
 
=======

  // Function to fetch dishes from the server
>>>>>>> origin/main
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/dishes', {
<<<<<<< HEAD
          credentials: 'include',
          headers:{
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
=======
  // Function to handle dish deletion
>>>>>>> origin/main
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/dishes/${itemId}`, {
        method: 'DELETE',
<<<<<<< HEAD
        credentials: 'include',
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        
=======
        credentials: 'include'
      });
      if (response.ok) {
        // Remove the deleted dish from the state
>>>>>>> origin/main
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
