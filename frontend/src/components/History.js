import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/History.css';
const BASE_URL = 'http://localhost:4000';

const History = () => {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
<<<<<<< HEAD
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${BASE_URL}/userData`, { withCredentials: true,
      headers:{
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
          fetchReports(userData.name, userData.email);
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

  const fetchReports = (name, email) => {
    axios.get(`${BASE_URL}/reports/user`, { 
        params: { name, email }, 
<<<<<<< HEAD
        withCredentials: true ,
        headers:{ Authorization: `Bearer ${token}`}
=======
        withCredentials: true 
>>>>>>> origin/main
      })
      .then(res => {
        setReports(res.data);
        console.log(reports);
      })
      .catch(err => {
        console.error('Error fetching reports:', err);
      });
  };

  return (
    <div className='history'>
     
      <h1 className='history-title'>View all your history of orders in Savor Green</h1>
      {user && (
        <div className='history-rep'>
          <h2 className='history-user'>{user.name} at {user.email}</h2>
          <h2 className='his-left'>Savor your taste</h2>
          <div className='history-pics'>
          <img src="https://i.pinimg.com/564x/06/36/62/063662fb4afa5e7b6fea1370de95e85c.jpg" alt="pic" className='his-img' />
          <img src="pictures/pic.jpg" alt="pic" className='his-img' />
         </div>
         <h1 className='prev-his'>Your Previous Orders</h1>
          <div className='history-list'>
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <div key={index} className='report-item'>
                  <div className='list'>
                  <h3 className='key'>Order Date : <span className='value'>{new Date(report.date).toLocaleDateString()}</span></h3>
                  <h4 className='key'>Order Time : <span className='value'>{report.time}</span></h4>
                  <h4 className='key'>Table No : <span className='value'>{report.tableNo}</span></h4>
                  <h4 className='key'>Total : <span className='value'> ₹ {report.total}</span></h4>
                  </div>
                  <table className='order-details'>
                    <thead>
                      <tr>
                        <th>Dish</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.orders.map((order, idx) => (
                        <tr key={idx}>
                          <td>{order.dish}</td>
                          <td>{order.quantity}</td>
                          <td>₹ {order.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br/>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
