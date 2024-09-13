import React, { useState } from 'react';
import axios from 'axios';
import '../css/contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const token = localStorage.getItem('authToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/feedback',
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setResponseMessage(response.data.message);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setResponseMessage('Failed to submit feedback');
    }
  };
  

  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Post your Feedback</h1>
        <p>We'd love to hear from you! Please reach out with any issues in dishes.</p>
        <div className="contact-details">
          <div className="contact-item">
            <h3>Address</h3>
            <p>123 Savor Green Street,<br />Food City, FC 12345</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+1 (123) 456-7890</p>
          </div>
          <div className="contact-item">
            <h3>Email</h3>
            <p>info@savorgreen.com</p>
          </div>
        </div>
        <div className="contact-form">
          <h2>Send us a message</h2>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-bttn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
