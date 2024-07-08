import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const Histories = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
  const token = localStorage.getItem('authToken');
=======
>>>>>>> origin/main

  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${BASE_URL}/reports/all`, { withCredentials: true ,
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
=======
      const response = await axios.get(`${BASE_URL}/reports/all`, { withCredentials: true });
>>>>>>> origin/main
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchReportsByName = async (name) => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${BASE_URL}/reports/name/${name}`, { withCredentials: true ,
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
=======
      const response = await axios.get(`${BASE_URL}/reports/name/${name}`, { withCredentials: true });
>>>>>>> origin/main
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports by name:', error);
    }
  };

  const fetchReportsByEmail = async (email) => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${BASE_URL}/reports/email/${email}`, { withCredentials: true,
        headers:{  Authorization: `Bearer ${token}`}
       });
=======
      const response = await axios.get(`${BASE_URL}/reports/email/${email}`, { withCredentials: true });
>>>>>>> origin/main
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports by email:', error);
    }
  };

  const fetchReportsByDate = async (date) => {
    try {
<<<<<<< HEAD
     
      const formattedDate = new Date(date).toISOString(); 
  
      const response = await axios.get(`${BASE_URL}/reports/date/${formattedDate}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
=======
      const response = await axios.get(`${BASE_URL}/reports/date/${date}`, { withCredentials: true });
>>>>>>> origin/main
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports by date:', error);
    }
  };
<<<<<<< HEAD
  
=======

>>>>>>> origin/main
  const handleFetchByName = () => {
    if (searchTerm) {
      fetchReportsByName(searchTerm);
    }
  };

  const handleFetchByEmail = () => {
    if (searchTerm) {
      fetchReportsByEmail(searchTerm);
    }
  };

  const handleFetchByDate = () => {
    if (searchTerm) {
      fetchReportsByDate(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='histories'>
      <div className='hist-searchbox'>
        <input
          type='text'
          className='search-input'
          placeholder='Search by name, email, or date...'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className='search-button'>
        <button  onClick={handleFetchByName}>Search by Name</button>
        <button onClick={handleFetchByEmail}>Search by Email</button>
        <button  onClick={handleFetchByDate}>Search by Date</button>
        </div>
      </div>
<<<<<<< HEAD
      <h1 className='hist-title'>Histories</h1><br/><br/>
      <div className="reports-list">
  {reports.map((report) => (
    <div key={report._id} className="reports-item">
      <div className='reports-first'>
        <p><strong>Name:</strong> {report.name}</p>
        <p><strong>Email:</strong> {report.email_id}</p>
        <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {report.time}</p>
        <p><strong>Table No:</strong> {report.tableNo}</p>
        <p><strong>Total:</strong> ₹ {report.total}</p>
      </div>
      <div className='reports-last'>
        <p><strong>Orders:</strong></p>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Dish</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {report.orders.map((order, index) => (
              <tr key={index}>
                <td>{order.quantity}</td>
                <td>{order.dish}</td>
                <td>₹ {order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>

=======
      <h1 className='hist-title'>Histories</h1>
      <div className="reports-list">
        {reports.map((report) => (
          <div key={report._id} className="reports-item">
            <div className='reports-first'>
              <p><strong>Name:</strong> {report.name}</p>
              <p><strong>Email:</strong> {report.email_id}</p>
              <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {report.time}</p>
              <p><strong>Table No:</strong> {report.tableNo}</p>
              <p><strong>Total:</strong> ₹ {report.total}</p>
            </div>
            <div className='reports-last'>
              <p><strong>Orders:</strong></p>
              <ul>
                {report.orders.map((order, index) => (
                  <li key={index}>
                    {order.quantity} x {order.dish} - ₹ {order.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
>>>>>>> origin/main
    </div>
  );
};

export default Histories;
