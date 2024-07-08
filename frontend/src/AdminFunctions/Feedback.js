import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminfunctions.css'; 

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
<<<<<<< HEAD
  const token = localStorage.getItem('authToken');
=======
>>>>>>> origin/main

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/feedback', {
        method: 'GET',
        credentials: 'include',
        headers: {
<<<<<<< HEAD
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
=======
          'Content-Type': 'application/json'
>>>>>>> origin/main
        }
      });
      if (!response.ok) {
        throw new Error('Error fetching feedback');
      }
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };


  return (
    <div className='feedback'>
      <h1>Feedback</h1>
      <div className="feedback-list">
        {feedbackList.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <p><strong>Name:</strong> {feedback.name}</p>
            <p><strong>Email:</strong> {feedback.email}</p>
            <p><strong>Message:</strong> {feedback.message}</p>
            <p><strong>Date:</strong> {new Date(feedback.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
