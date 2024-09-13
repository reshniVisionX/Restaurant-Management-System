import React, { useState, useEffect } from 'react';
import './adminfunctions.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; 

const Bookings = () => {
  const [tables, setTables] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/tables`, { withCredentials: true,
          headers:{
              Authorization: `Bearer ${token}`
          }
         });
        setTables(response.data);
        console.log(tables);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className='booking_pack'>
      <h1>My Bookings</h1>
      <div className='table-list'>
        {tables.map(table => (
          <div key={table._id} className='table-item'>
            <h3>Table No: {table.tno}</h3>
            <p>Status: {table.status ? 'Available' : 'Occupied'}</p>
            <ul>
              {table.orders.map((order, index) => (
                <li key={index}>
                  {order.dish} - Quantity: {order.quantity} - Price: ₹{order.price}
                </li>
              ))}
            </ul>
            <p>Total: ₹{table.total}</p>
          </div>
        ))}
      </div>
      <br/><br/><br/>
    </div>
  );
};

export default Bookings;
