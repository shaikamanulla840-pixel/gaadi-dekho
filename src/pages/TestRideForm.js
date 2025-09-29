import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestRideForm = () => {
    const navigate = useNavigate();
    const [twoWheelers, setTwoWheelers] = useState([]);
    const [showrooms, setShowrooms] = useState([]);
    const [formData, setFormData] = useState({
        twoWheeler: '',
        showroom: '',
        date: '',
        time: '',
    });

    const { twoWheeler, showroom, date, time } = formData;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const twoWheelersRes = await axios.get('/api/twoWheelers');
                setTwoWheelers(twoWheelersRes.data);

                const showroomsRes = await axios.get('/api/showrooms');
                setShowrooms(showroomsRes.data);
            } catch (err) {
                console.error(err);
                alert('Error fetching initial data');
            }
        };
        fetchInitialData();
    }, []);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };
            // Assuming user ID is extracted from token on backend
            await axios.post('/api/test-rides', formData, config);
            alert('Test ride booked successfully!');
            navigate('/');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg || 'Something went wrong');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Book a Test Ride</h2>
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Two-Wheeler</label>
                        <select name="twoWheeler" value={twoWheeler} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Select a Two-Wheeler</option>
                            {twoWheelers.map((tw) => (
                                <option key={tw._id} value={tw._id}>{tw.brand} {tw.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Showroom</label>
                        <select name="showroom" value={showroom} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Select a Showroom</option>
                            {showrooms.map((sr) => (
                                <option key={sr._id} value={sr._id}>{sr.name} - {sr.city}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                        <input type="date" name="date" value={date} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Time</label>
                        <input type="time" name="time" value={time} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold">Book Test Ride</button>
                </div>
            </form>
        </div>
    );
};

export default TestRideForm;
