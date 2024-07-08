import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './adminfunctions.css';

const UpdateOne = () => {
  const { item_id } = useParams();
  const [dish, setDish] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rate: 0,
    quantity: 0,
    rating: 0,
    image: null,
  });
<<<<<<< HEAD
  const token = localStorage.getItem('authToken');
=======
>>>>>>> origin/main

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(`http://localhost:4000/admin/dishes/search/${item_id}`, {
<<<<<<< HEAD
          credentials: 'include',headers:{  Authorization: `Bearer ${token}`}
        });
        if (response.ok) {
          const data = await response.json();
          setDish(data.dish); 
=======
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setDish(data.dish); // Assuming data structure returns { dish: { ... } }
>>>>>>> origin/main
          setFormData({
            name: data.dish.name,
            rate: data.dish.rate,
            quantity: data.dish.quantity,
            rating: data.dish.rating,
            image: null,
          });
        } else {
          console.error('Failed to fetch dish:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dish:', error);
      }
    };

    fetchDish();
  }, [item_id]);

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

  const handleUpdateOne = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('rate', formData.rate);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('rating', formData.rating);
      if (formData.image) formDataToSend.append('uploadImage', formData.image);

      const response = await fetch(`http://localhost:4000/admin/dishes/updateOne/${item_id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formDataToSend,
<<<<<<< HEAD
        headers:{
            Authorization: `Bearer ${token}`
        }
=======
>>>>>>> origin/main
      });

      if (response.ok) {
        alert("Dish updated successfully");
      } else {
        const err = await response.text();
        alert("Error while updating dish: " + err);
      }
    } catch (error) {
      console.error("Error while updating dish:", error);
      alert("Error while updating dish: " + error.message);
    }
  };

  return (
    <div className='update_dish'>
      <h1>Update Dish</h1>
      <p>ID to be Updated: {item_id}</p>
      {dish && (
        <div className='dish-details'>
          <label htmlFor="image">Update Image:</label>
          <input type="file" id="image" name="image" className='upload_box' onChange={handleFileChange} /><br /><br />

          <label htmlFor="name">Dish Name:</label>
          <input type="text" id="name" name="name" value={formData.name} className='input_box' onChange={handleInputChange} required /><br /><br />

          <label htmlFor="rate">Rate:</label>
          <input type="number" id="rate" name="rate" value={formData.rate} className='input_box' onChange={handleInputChange} required /><br /><br />

          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} className='input_box' onChange={handleInputChange} /><br /><br />

          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" name="rating" min="0" max="5" value={formData.rating} className='input_box' onChange={handleInputChange} /><br /><br />

          <button type='button' onClick={handleUpdateOne} className='update_btn'>Update</button>
        </div>
      )}
    </div>
  );
};

export default UpdateOne;
