import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Recommendations from '../components/Recommendations';

const ProductPage = () => {
    const { id } = useParams();
    const [twoWheeler, setTwoWheeler] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewFormData, setReviewFormData] = useState({ rating: 0, comment: '' });
    const [selectedImage, setSelectedImage] = useState('');
    const [alertActive, setAlertActive] = useState(false);
    const [isAlertLoading, setIsAlertLoading] = useState(true);
    const token = localStorage.getItem('token');

    // Fetch Vehicle, Reviews, and check Alert Status
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch vehicle data
                const twoWheelerRes = await axios.get(`/api/twoWheelers/${id}`);
                setTwoWheeler(twoWheelerRes.data);
                if (twoWheelerRes.data && twoWheelerRes.data.images.length > 0) {
                    setSelectedImage(twoWheelerRes.data.images[0].url);
                }

                // Fetch reviews
                const reviewsRes = await axios.get(`/api/reviews/${id}`);
                setReviews(reviewsRes.data);

                // Check price alert status if user is logged in
                if (token) {
                    const config = { headers: { 'x-auth-token': token } };
                    const alertsRes = await axios.get('/api/price-alerts/my-alerts', config);
                    const isActive = alertsRes.data.some(alert => alert.twoWheeler._id === id && alert.status === 'active');
                    setAlertActive(isActive);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
                setIsAlertLoading(false);
            }
        };
        fetchAllData();
    }, [id, token]);

    // Check Favorite Status
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (token && twoWheeler) {
                try {
                    const config = { headers: { 'x-auth-token': token } };
                    const res = await axios.get('/api/users/favorites', config);
                    setIsFavorite(res.data.some(fav => fav._id === twoWheeler._id));
                } catch (err) {
                    console.error('Error checking favorite status:', err);
                }
            }
        };
        checkFavoriteStatus();
    }, [token, twoWheeler]);

    const handleFavoriteToggle = async () => {
        // ... (omitted for brevity, no changes here)
    };

    const handleSetPriceAlert = async () => {
        if (!token) return alert('Please log in to set a price alert.');
        try {
            const config = { headers: { 'x-auth-token': token } };
            await axios.post('/api/price-alerts', { twoWheelerId: id }, config);
            setAlertActive(true);
            alert('Price alert has been set! We will notify you of any price drops.');
        } catch (err) {
            alert(err.response?.data?.msg || 'Could not set price alert.');
        }
    };

    const handleReviewChange = (e) => {
        setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });
    };

    const handleReviewSubmit = async (e) => {
        // ... (omitted for brevity, no changes here)
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
    if (!twoWheeler) return <div className="text-center py-10">Two-wheeler not found.</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h2 className="text-3xl font-bold mb-4">{twoWheeler.brand} {twoWheeler.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        {/* Image Gallery */}
                        <div className="mb-4">
                            <img src={selectedImage ? `http://localhost:5000${selectedImage}` : 'https://via.placeholder.com/500'} alt={twoWheeler.name} className="w-full h-auto rounded-lg object-cover" style={{ height: '400px' }} />
                        </div>
                        <div className="flex space-x-2 overflow-x-auto p-2">
                            {twoWheeler.images.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={`http://localhost:5000${image.url}`} 
                                    alt={`${twoWheeler.name} thumbnail ${index + 1}`}
                                    onClick={() => setSelectedImage(image.url)}
                                    className={`w-24 h-24 rounded-md object-cover cursor-pointer border-2 ${selectedImage === image.url ? 'border-red-600' : 'border-transparent'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        {/* Details */}
                        <p className="text-gray-700 mb-2"><strong>Type:</strong> {twoWheeler.type}</p>
                        <p className="text-gray-700 mb-2"><strong>Fuel Type:</strong> {twoWheeler.fuelType}</p>
                        <p className="text-3xl font-bold text-red-600 mb-4">₹{twoWheeler.price.toLocaleString()}</p>
                        {/* ... other specs ... */}
                        <p className="text-gray-700 mb-4"><strong>Description:</strong> {twoWheeler.description}</p>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Compare</button>
                            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Book Test Ride</button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Buy/Contact Dealer</button>
                            {token && (
                                <button onClick={handleFavoriteToggle} className={`px-4 py-2 rounded-lg ${isFavorite ? 'bg-red-600' : 'bg-gray-700'} text-white`}>
                                    {isFavorite ? 'Favorited' : 'Add to Favorites'}
                                </button>
                            )}
                            {token && (
                                <button 
                                    onClick={handleSetPriceAlert}
                                    disabled={alertActive || isAlertLoading}
                                    className={`px-4 py-2 rounded-lg text-white ${alertActive ? 'bg-green-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'}`}>
                                    {isAlertLoading ? 'Loading...' : (alertActive ? 'Alert is Active' : 'Set Price Alert')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Reviews Section ... */}
            </div>
            <Recommendations vehicleId={id} />
        </div>
    );
};

export default ProductPage;