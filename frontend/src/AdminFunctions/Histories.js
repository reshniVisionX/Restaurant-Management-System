import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Histories = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchAllReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [searchTerm, reports]);

  const fetchAllReports = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/reports/all`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(response.data);
      setFilteredReports(response.data); 
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const filterReports = () => {
    if (!searchTerm) {
      setFilteredReports(reports);
      return;
    }

    const lowerCasedTerm = searchTerm.toLowerCase();
    const filtered = reports.filter((report) => {
      const reportDate = new Date(report.date).toLocaleDateString();
      return (
        report.name.toLowerCase().includes(lowerCasedTerm) ||
        report.email_id.toLowerCase().includes(lowerCasedTerm) ||
        reportDate.includes(lowerCasedTerm)
      );
    });

    setFilteredReports(filtered);
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
      </div>
      <h1 className='hist-title'>Histories</h1>
      <br /><br />
      <div className="reports-list">
        {filteredReports.map((report) => (
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
    </div>
  );
};

export default Histories;
