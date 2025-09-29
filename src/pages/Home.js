import React, { useState, useEffect } from 'react';
import api from '../config/axios';

const Home = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/test');
        console.log('API Response:', response.data);
      } catch (err) {
        setError(err.message);
        console.error('Detailed error:', err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold">Welcome to GAADI DEKHO</h1>
      <p className="mt-4 text-lg">Browse bikes, scooters, and EVs.</p>
    </div>
  );
};

export default Home;
