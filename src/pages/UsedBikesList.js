import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsedBikesList = () => {
    const [usedTwoWheelers, setUsedTwoWheelers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsedTwoWheelers = async () => {
            try {
                // Assuming a filter for 'used' condition will be available in the API
                const res = await axios.get('/api/twoWheelers?condition=used');
                setUsedTwoWheelers(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchUsedTwoWheelers();
    }, []);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Used Two-Wheelers for Sale</h2>
            {usedTwoWheelers.length === 0 ? (
                <p className="text-center">No used two-wheelers available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {usedTwoWheelers.map((tw) => (
                        <div key={tw._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <Link to={`/product/${tw._id}`}>
                                <img src={tw.images[0]?.url || 'https://via.placeholder.com/300'} alt={tw.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{tw.brand} {tw.name}</h3>
                                    <p className="text-gray-700 mb-1">Type: {tw.type}</p>
                                    <p className="text-gray-700 mb-1">Fuel Type: {tw.fuelType}</p>
                                    <p className="text-gray-900 font-bold text-lg">Price: ₹{tw.price.toLocaleString()}</p>
                                    {tw.sellerContact && (
                                        <p className="text-gray-600 text-sm mt-2">Seller Contact: {tw.sellerContact}</p>
                                    )}
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

export default UsedBikesList;
