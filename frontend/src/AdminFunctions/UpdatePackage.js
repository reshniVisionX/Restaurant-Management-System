import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminfunctions.css';

const UpdateDish = () => {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
<<<<<<< HEAD
  const token = localStorage.getItem('authToken');
  
=======

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

  const handleIdSearch = async () => {
    try {
<<<<<<< HEAD
    
      const response = await fetch(`http://localhost:4000/admin/dishes/search/${searchId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      });
  
=======
      const response = await fetch(`http://localhost:4000/admin/dishes/search/${searchId}`);
>>>>>>> origin/main
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setDishes([data.dish]);
      } else {
        console.error('Failed to fetch dish by ID');
      }
    } catch (error) {
      console.error('Error fetching dish by ID:', error);
    }
  };
<<<<<<< HEAD
  
  const handleNameSearch = async () => {
    try {
      
      const response = await fetch(`http://localhost:4000/admin/dishes/search/name/${searchName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      });
  
=======

  const handleNameSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/admin/dishes/search/name/${searchName}`);
>>>>>>> origin/main
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setDishes(data.dishes);
      } else {
        console.error('Failed to fetch dish by name');
      }
    } catch (error) {
      console.error('Error fetching dish by name:', error);
    }
  };
  
<<<<<<< HEAD
  
=======
>>>>>>> origin/main
  const handleSubmit = (id) => {
    navigate(`/updateOne/${id}`);
  };

  return (
    <div className='update_dish'>
      <input 
        type='text' 
        value={searchId} 
        onChange={(e) => setSearchId(e.target.value)} 
        placeholder='Search by Item ID' 
      />
      <button type='button' onClick={handleIdSearch}>Search by ID</button>

      <input 
        type='text' 
        value={searchName} 
        onChange={(e) => setSearchName(e.target.value)} 
        placeholder='Search by Dish Name' 
      />
      <button type='button' onClick={handleNameSearch}>Search by Name</button>

      {dishes.map((dish, index) => (
          <fieldset key={index}>
            <h2>Dish Name: {dish.name}</h2>
            <h3>Category : {dish.category}</h3>
            <h3>Rate: {dish.rate}</h3>
            <button onClick={() => handleSubmit(dish.item_id)}>Update</button>
          </fieldset>
        ))}
        <br/><br/>
    </div>
  );
};

export default UpdateDish;
