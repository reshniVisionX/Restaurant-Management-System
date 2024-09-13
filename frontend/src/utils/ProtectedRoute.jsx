import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:4000';

const ProtectedRoutes = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${BASE_URL}/userData`, {
        credentials: 'include',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(userData => {
          setUsername(userData.name);
          console.log('protected route for :', userData.name);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setLoading(false); 
        });
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return username ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
