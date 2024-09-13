import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminfunctions.css';
const BASE_URL = process.env.BASE_URL;

const UpdateDish = () => {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
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

  const handleIdSearch = async () => {
    try {
    
      const response = await fetch(`${BASE_URL}/admin/dishes/search/${searchId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      });
  
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
  
  const handleNameSearch = async () => {
    try {
      
      const response = await fetch(`${BASE_URL}/admin/dishes/search/name/${searchName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      });
  
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
