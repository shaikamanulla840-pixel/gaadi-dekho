import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UpcomingLaunches = () => {
    const [upcomingTwoWheelers, setUpcomingTwoWheelers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpcomingTwoWheelers = async () => {
            try {
                // Assuming a filter for 'upcomingLaunch' will be available in the API
                const res = await axios.get('/api/twoWheelers?upcomingLaunch=true');
                setUpcomingTwoWheelers(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchUpcomingTwoWheelers();
    }, []);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Upcoming Launches</h2>
            {upcomingTwoWheelers.length === 0 ? (
                <p className="text-center">No upcoming launches at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingTwoWheelers.map((tw) => (
                        <div key={tw._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <Link to={`/product/${tw._id}`}>
                                <img src={tw.images[0]?.url || 'https://via.placeholder.com/300'} alt={tw.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{tw.brand} {tw.name}</h3>
                                    <p className="text-gray-700 mb-1">Type: {tw.type}</p>
                                    <p className="text-gray-700 mb-1">Expected Launch: {new Date(tw.launchDate).toLocaleDateString()}</p>
                                    <p className="text-gray-900 font-bold text-lg">Price: ₹{tw.price.toLocaleString()}</p>
                                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Details</button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpcomingLaunches;
