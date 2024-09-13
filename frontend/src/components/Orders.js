import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/order.css';

const BASE_URL = process.env.BASE_URL;

const Orders = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tables`, {
          credentials: 'include', 
          headers:{
             Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTables(data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const handleOrder = async (tno) => {
    console.log("Tno",tno);
    const table = tables.find((table) => table.tno === tno);
    if (table && table.status) {
      const updatedTables = tables.map((tableItem) =>
        tableItem.tno === tno ? { ...tableItem, status: false } : tableItem
      );
      setTables(updatedTables);

      try {
        const response = await fetch(`${BASE_URL}/tables/${tno}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
          },
          credentials: 'include', 
          body: JSON.stringify({ status: false }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
            console.log("table no from order : ",tno);
        navigate(`/myorder/${tno}`);
      } catch (error) {
        console.error('Error updating table status:', error);
        alert("Error updating table status, please try again.");
      }
    } else {
      alert("The table is booked, please choose another");
    }
  };

  return (
    <div className='orders'>
      <h1 className='orders-title'>Select your table</h1>
      <h2 className='orders-title'>Make your orders</h2>
      <div className='order-table'>
        {tables.map((tab, index) => (
          <div
            key={index}
            className={`table ${tab.status ? 'available' : 'unavailable'}`}
            style={{ border: '1px solid black', padding: '20px', cursor: 'pointer' }}
            onClick={() => handleOrder(tab.tno)}
          >
           <img
            src={tab.status ? "https://i.pinimg.com/564x/c3/9c/56/c39c56bc405dde5bfd4a92cfdb22f4fd.jpg" : "https://i.pinimg.com/564x/30/15/24/3015248a0b9442da47d5e1bf57da7b50.jpg"}
            alt={tab.status ? 'available' : 'reserved'}
            className='table-pic' />
           <h2>Table : {tab.tno}</h2>
          </div>
        ))}
      </div>
      <br /><br />
    </div>
  );
};

export default Orders;
