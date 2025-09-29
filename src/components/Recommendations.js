import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleCard from './VehicleCard';

const Recommendations = ({ vehicleId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!vehicleId) return;

        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/twoWheelers/${vehicleId}/recommendations`);
                setRecommendations(res.data);
            } catch (err) {
                // Don't show an error, just log it. It's not a critical feature.
                console.error('Failed to fetch recommendations:', err);
            }
            setLoading(false);
        };

        fetchRecommendations();
    }, [vehicleId]);

    // Don't render the component if there are no recommendations or it's still loading.
    if (loading || recommendations.length === 0) {
        return null; 
    }

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">You Might Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.map((rec, index) => (
                        <VehicleCard key={rec._id} vehicle={rec} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
