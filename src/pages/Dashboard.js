import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';

// View for Dealers and Admins
const DealerDashboardView = ({ user }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };
                const res = await axios.get('/api/twoWheelers/my-listings', config);
                setListings(res.data);
            } catch (err) {
                console.error('Error fetching listings:', err);
            }
            setLoading(false);
        };
        fetchListings();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };
                await axios.delete(`/api/twoWheelers/${id}`, config);
                setListings(listings.filter(item => item._id !== id));
                alert('Listing deleted successfully.');
            } catch (err) {
                console.error('Error deleting listing:', err);
                alert('Failed to delete listing.');
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading your listings...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">My Vehicle Listings</h3>
                <Link to="/add-two-wheeler" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    + Add New Vehicle
                </Link>
            </div>
            {listings.length === 0 ? (
                <p className="text-center bg-gray-100 p-4 rounded-md">You have not added any vehicles yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Brand</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {listings.map(item => (
                                <tr key={item._id} className="border-b">
                                    <td className="py-3 px-4">{item.name}</td>
                                    <td className="py-3 px-4">{item.brand}</td>
                                    <td className="py-3 px-4">₹{item.price.toLocaleString()}</td>
                                    <td className="py-3 px-4">
                                        <Link to={`/edit-vehicle/${item._id}`} className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-2 rounded mr-2">Edit</Link>
                                        <button onClick={() => handleDelete(item._id)} className="text-sm bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// View for Regular Users
const UserDashboardView = ({ user }) => {
    const [testRides, setTestRides] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };

        const fetchAllUserData = async () => {
            try {
                const [ridesRes, alertsRes, notificationsRes] = await Promise.all([
                    axios.get(`/api/test-rides/user/${user.id}`, config),
                    axios.get('/api/price-alerts/my-alerts', config),
                    axios.get('/api/notifications', config)
                ]);
                setTestRides(ridesRes.data);
                setAlerts(alertsRes.data);
                setNotifications(notificationsRes.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUserData();
    }, [user]);

    const handleDeleteAlert = async (id) => {
        if (window.confirm('Are you sure you want to remove this price alert?')) {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };
                await axios.delete(`/api/price-alerts/${id}`, config);
                setAlerts(alerts.filter(alert => alert._id !== id));
            } catch (err) {
                console.error('Failed to delete alert', err);
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading your dashboard...</div>;

    return (
        <div className="space-y-12">
            {/* Notifications Section */}
            <div>
                <h3 className="text-2xl font-semibold mb-4">Notifications</h3>
                {notifications.length === 0 ? (
                    <p className="text-center bg-gray-100 p-4 rounded-md">You have no new notifications.</p>
                ) : (
                    <div className="space-y-3">
                        {notifications.map(notif => (
                            <div key={notif._id} className={`p-4 rounded-lg ${notif.isRead ? 'bg-gray-200' : 'bg-red-100 border border-red-300'}`}>
                                <p>{notif.message}</p>
                                <Link to={notif.link} className="text-sm text-red-600 hover:underline">View Vehicle</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Alerts Section */}
            <div>
                <h3 className="text-2xl font-semibold mb-4">My Price Alerts</h3>
                {alerts.length === 0 ? (
                    <p className="text-center bg-gray-100 p-4 rounded-md">You have not set any price alerts.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {alerts.map(alert => (
                            <div key={alert._id} className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold">{alert.twoWheeler.brand} {alert.twoWheeler.name}</h4>
                                    <p className={`text-sm ${alert.status === 'triggered' ? 'text-green-600' : 'text-gray-600'}`}>Status: <span className="font-semibold">{alert.status}</span></p>
                                    <p className="text-sm text-gray-500">Alert set at: ₹{alert.initialPrice.toLocaleString()}</p>
                                    <p className="text-sm text-gray-800">Current Price: ₹{alert.twoWheeler.price.toLocaleString()}</p>
                                </div>
                                {alert.status === 'active' && 
                                    <button onClick={() => handleDeleteAlert(alert._id)} className="text-xs bg-gray-200 hover:bg-red-200 text-red-800 font-semibold py-1 px-2 rounded">Remove</button>
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Test Rides Section */}
            <div>
                <h3 className="text-2xl font-semibold mb-4">My Test Rides</h3>
                {testRides.length === 0 ? (
                    <p className="text-center bg-gray-100 p-4 rounded-md">No test rides booked yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testRides.map((ride) => (
                            <div key={ride._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                                <h4 className="text-xl font-semibold mb-2">{ride.twoWheeler.brand} {ride.twoWheeler.name}</h4>
                                <p className="text-gray-700 mb-1">Showroom: {ride.showroom.name}</p>
                                <p className="text-gray-700 mb-1">Date: {new Date(ride.date).toLocaleDateString()}</p>
                                <p className="text-gray-700 mb-1">Time: {ride.time}</p>
                                <p className="text-gray-700 mb-1">Status: <span className="font-semibold">{ride.status}</span></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Main Dashboard Component
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.user);
            } catch (error) {
                console.error("Invalid token");
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    if (loading) return <div className="text-center py-10">Loading...</div>;

    if (!user) {
        return (
            <div className="text-center py-10">
                <p>Please <Link to="/auth" className="text-red-600 hover:underline">log in</Link> to view your dashboard.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">My Dashboard</h2>
            {user.role === 'dealer' || user.role === 'admin' ? (
                <DealerDashboardView user={user} />
            ) : (
                <UserDashboardView user={user} />
            )}
        </div>
    );
};

export default Dashboard;