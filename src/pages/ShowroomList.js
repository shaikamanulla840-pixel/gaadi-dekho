import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowroomList = () => {
    const [showrooms, setShowrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShowrooms = async () => {
            try {
                const res = await axios.get('/api/showrooms');
                setShowrooms(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchShowrooms();
    }, []);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Showrooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showrooms.map((showroom) => (
                    <div key={showroom._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                        <h3 className="text-xl font-semibold mb-2">{showroom.name}</h3>
                        <p className="text-gray-700 mb-1">{showroom.address}, {showroom.city}</p>
                        <p className="text-gray-700 mb-1">{showroom.state} - {showroom.pincode}</p>
                        <p className="text-gray-700 mb-1">Phone: {showroom.phone}</p>
                        <p className="text-gray-700 mb-1">Email: {showroom.email}</p>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowroomList;
