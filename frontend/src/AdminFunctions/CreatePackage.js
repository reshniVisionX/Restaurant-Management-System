import React, { useState } from 'react';
import './adminfunctions.css';
const BASE_URL = process.env.BASE_URL;

const CreateDish = () => {
  const [formData, setFormData] = useState({
    item_id: '',
    category: '',
    name: '',
    rate: '',
    quantity: '',
    rating: '',
    image: null,
  });
  const token = localStorage.getItem('authToken');

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('item_id', formData.item_id);
    data.append('category', formData.category);
    data.append('name', formData.name);
    data.append('rate', formData.rate);
    data.append('quantity', formData.quantity);
    data.append('rating', formData.rating);
    data.append('image', formData.image);
    
    try {
      const response = await fetch(`${BASE_URL}/admin/createdish`, {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert('Dish created successfully!');
      } else {
        alert('Failed to create dish');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create dish');
    }
  };

  return (
    <div className='create_dish'>
      <h1>Create a New Dish</h1>
      <fieldset>
        <legend>CREATE A NEW DISH</legend>
        <div className='dish-details'>
          <div className='form-group'>
            <label htmlFor='item_id'>Item ID:</label>
            <input type='text' id='item_id' name='item_id' value={formData.item_id} onChange={handleInputChange} required />
          </div>
          <div className='form-group'>
            <label htmlFor='category'>Category:</label>
            <select id='category' name='category' value={formData.category} onChange={handleInputChange} required>
              <option value=''>Select Category</option>
              <option value='Appetizers'>Appetizers</option>
              <option value='Main Courses'>Main Courses</option>
              <option value='Snacks'>Snacks</option>
              <option value='Desserts'>Desserts</option>
              <option value='Beverages'>Beverages</option>
              <option value='Grilled Items'>Grilled Items</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' name='name' value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className='form-group'>
            <label htmlFor='rate'>Rate:</label>
            <input type='number' id='rate' name='rate' value={formData.rate} onChange={handleInputChange} required />
          </div>
          <div className='form-group'>
            <label htmlFor='quantity'>Quantity:</label>
            <input type='number' id='quantity' name='quantity' value={formData.quantity} onChange={handleInputChange} required />
          </div>
          <div className='form-group'>
            <label htmlFor='rating'>Rating:</label>
            <input type='number' id='rating' name='rating' value={formData.rating} onChange={handleInputChange} required />
          </div>
          <div className='form-group'>
            <label htmlFor='image'>Image:</label>
            <input type='file' id='image' name='image' onChange={handleFileChange} required />
          </div>
        </div>
        <button type="button" className='dish_submit' onClick={handleSubmit}>Submit</button>
      </fieldset><br/><br/><br/>
    </div>
  );
};

export default CreateDish;
